import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { Subject, filter, firstValueFrom, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ScrollNearEndDirective } from 'src/app/directives/scroll-near-end.directive';
import { ComponentStore } from '@ngrx/component-store';
import { ItemsStore, getInitialState } from './+state/item.store';
import { LayoutComponent } from '../layout-components/layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-date-page',
  templateUrl: './date-page.component.html',
  styleUrls: ['./date-page.component.scss'],
  imports: [LayoutComponent, CommonModule, CardComponent, MatProgressSpinnerModule, LayoutModule, ScrollNearEndDirective],
  providers: [ItemsStore, ComponentStore],
})
export class DatePageComponent implements OnInit, OnDestroy {
  title = '';

  readonly entities$ = this.store.select((state) => state.entities);
  readonly isLoading$ = this.store.select((state) => state.isLoading);
  readonly page$ = this.store.select((state) => state.page);
  readonly state$ = this.store.select((state) => state);

  private _unsubscriber = new Subject<void>();

  constructor(private readonly store: ItemsStore, private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._router.events
      .pipe(
        takeUntil(this._unsubscriber),
        filter((x) => x instanceof NavigationEnd)
      )
      .subscribe(async (routerEvent) => {
        const { date } = await firstValueFrom(this.state$);
        let queryDate = this.route.snapshot.params['date'];
        if (date === queryDate) return;

        this.store.patchState(getInitialState(queryDate));
        this.store.loadInitialPageData$();
      });

    this.store.loadInitialPageData$();
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  async onNearEndScroll(): Promise<void> {
    const { page, isLoading, hasMore } = await firstValueFrom(this.state$);
    if (isLoading || !hasMore) return;

    this.store.patchState({ isLoading: true });
    this.store.getNextElements$(page + 1);
  }
}
