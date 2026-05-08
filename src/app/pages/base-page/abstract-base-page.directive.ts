import { Directive, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemIds } from '../../models/item-ids.model';
import { BaseItemsStore } from './+state/base-item.store';
import { ItemService } from 'src/app/services/item.service';

@Directive()
export abstract class AbstractBasePage implements OnInit {
  title = '';
  protected _store = inject(BaseItemsStore);
  readonly entities$ = this._store.select((state) => state.entities);

  protected _route = inject(ActivatedRoute);
  protected _itemService = inject(ItemService);

  ngOnInit(): void {
    this.title = this._route.snapshot.routeConfig?.title as string;
    const { ids } = this._route.snapshot.data as ItemIds;
    this._store.patchState({ ids });

    this._store.loadInitialPageData$();
  }
}
