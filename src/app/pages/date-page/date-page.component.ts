import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { Subject, filter, firstValueFrom, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { ItemsStore, getInitialState } from './+state/item.store';
import { LayoutComponent } from '../layout-components/layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-date-page',
  templateUrl: './date-page.component.html',
  styleUrls: ['./date-page.component.scss'],
  imports: [LayoutComponent, CommonModule, MatProgressSpinnerModule, LayoutModule],
  providers: [ItemsStore, ComponentStore],
})
export class DatePageComponent implements OnInit, OnDestroy {
  title = '';

  private _store = inject(ItemsStore);
  readonly entities$ = this._store.select((state) => state.entities);
  readonly isLoading$ = this._store.select((state) => state.isLoading);
  readonly page$ = this._store.select((state) => state.page);
  readonly state$ = this._store.select((state) => state);

  private _unsubscriber = new Subject<void>();
  private _router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this._router.events
      .pipe(
        takeUntil(this._unsubscriber),
        filter((x) => x instanceof NavigationEnd),
      )
      .subscribe(async () => {
        const { date } = await firstValueFrom(this.state$);
        const queryDate = this.route.snapshot.params['date'];
        if (date === queryDate) return;

        this._store.patchState(getInitialState(queryDate));
        this._store.loadInitialPageData$();
      });

    this._store.loadInitialPageData$();
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  async onNearEndScroll(): Promise<void> {
    const { page, isLoading, hasMore } = await firstValueFrom(this.state$);
    if (isLoading || !hasMore) return;

    this._store.patchState({ isLoading: true });
    this._store.getNextElements$(page + 1);
  }
}
