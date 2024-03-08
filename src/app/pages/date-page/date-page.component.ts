import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ScrollNearEndDirective } from 'src/app/directives/scroll-near-end.directive';
import { ComponentStore } from '@ngrx/component-store';
import { ItemsStore } from './+state/item.store';
import { LayoutComponent } from '../layout-components/layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-date-page',
  templateUrl: './date-page.component.html',
  styleUrls: ['./date-page.component.scss'],
  imports: [LayoutComponent, CommonModule, CardComponent, MatProgressSpinnerModule, LayoutModule, ScrollNearEndDirective],
  providers: [ItemsStore, ComponentStore],
})
export class DatePageComponent implements OnInit {
  title = '';

  readonly entities$ = this.store.select((state) => state.entities);
  readonly isLoading$ = this.store.select((state) => state.isLoading);
  readonly page$ = this.store.select((state) => state.page);
  readonly state$ = this.store.select((state) => state);

  constructor(private readonly store: ItemsStore, private _route: ActivatedRoute, private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    // Todo: Todo: implement datepicker & update date if necessary

    this.store.loadInitialPageData$();
  }

  async onNearEndScroll(): Promise<void> {
    const { page, isLoading, hasMore} = await firstValueFrom(this.state$);
    if (isLoading || !hasMore) return;
    this.store.patchState({ isLoading: true });
    this.store.getNextElements$(page + 1);

    console.log('onNearEndScroll - page: ', page);
  }
}
