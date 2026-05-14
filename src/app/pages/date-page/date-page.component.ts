import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { filter, firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { ItemsStore, getInitialState } from './+state/item.store';
import { LayoutComponent } from '../layout-components/layout/layout.component';
import { DataRefreshService } from 'src/app/services/data-refresh.service';

@Component({
  selector: 'app-date-page',
  templateUrl: './date-page.component.html',
  styleUrls: ['./date-page.component.scss'],
  imports: [LayoutComponent, CommonModule, MatProgressSpinnerModule, LayoutModule],
  providers: [ItemsStore, ComponentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePageComponent implements OnInit {
  title = '';

  private readonly _store = inject(ItemsStore);
  private readonly _refreshService = inject(DataRefreshService);
  private readonly _router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);

  readonly entities$ = this._store.select((state) => state.entities);
  readonly isLoading$ = this._store.select((state) => state.isLoading);
  readonly page$ = this._store.select((state) => state.page);
  readonly state$ = this._store.select((state) => state);

  ngOnInit(): void {
    // Listen for refresh triggered from header
    this._refreshService.refresh$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(async () => {
      const { date, isLoading } = await firstValueFrom(this.state$);
      if (isLoading) return;

      this._store.patchState(getInitialState(date));
      this._store.loadInitialPageData$();
    });

    // Handle navigation changes
    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((x) => x instanceof NavigationEnd),
      )
      .subscribe(async () => {
        const { date, isLoading } = await firstValueFrom(this.state$);
        const queryDate = this.route.snapshot.params['date'];
        if (date === queryDate || isLoading) return;

        this._store.patchState(getInitialState(queryDate));
        this._store.loadInitialPageData$();
      });

    this._store.loadInitialPageData$();
  }

  async onNearEndScroll(): Promise<void> {
    const { page, isLoading, hasMore } = await firstValueFrom(this.state$);
    if (isLoading || !hasMore) return;

    this._store.patchState({ isLoading: true });
    this._store.getNextElements$(page + 1);
  }
}
