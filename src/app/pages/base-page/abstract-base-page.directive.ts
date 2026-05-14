import { Directive, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemIds } from '../../models/item-ids.model';
import { BaseItemsStore } from './+state/base-item.store';
import { ItemService } from 'src/app/services/item.service';
import { DataRefreshService } from 'src/app/services/data-refresh.service';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export abstract class AbstractBasePage implements OnInit {
  title = '';
  protected _store = inject(BaseItemsStore);
  protected _refreshService = inject(DataRefreshService);
  readonly entities$ = this._store.select((state) => state.entities);
  readonly state$ = this._store.select((state) => state);

  protected _route = inject(ActivatedRoute);
  protected _itemService = inject(ItemService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.title = this._route.snapshot.routeConfig?.title as string;
    const { ids } = this._route.snapshot.data as ItemIds;
    this._store.patchState({ ids });

    // Listen for refresh triggered from header
    this._refreshService.refresh$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(async () => {
      // Only refresh if not already loading
      const { isLoading } = await firstValueFrom(this.state$);
      if (isLoading) return;

      const { ids } = this._route.snapshot.data as ItemIds;
      this._store.patchState({ ids, entities: [], page: 1, isLoading: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this._store.loadInitialPageData$();
    });

    this._store.loadInitialPageData$();
  }
}
