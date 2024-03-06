import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/comonents/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, defer, finalize, map, of, switchMap, take } from 'rxjs';
import { Item } from 'src/typescript-angular-client-generated';
import { ActivatedRoute } from '@angular/router';
import { PagedItemResult } from 'src/app/models/paged-result.model';
import { PagedItemsService } from 'src/app/services/paged-items.service';
import { DEFAULT_PAGE_SIZE } from 'src/app/others/constants';
import { ScrollNearEndDirective } from 'src/app/directives/scroll-near-end.directive';

@Component({
  standalone: true,
  selector: 'app-date-page',
  templateUrl: './date-page.component.html',
  imports: [CommonModule, CardComponent, MatProgressSpinnerModule, LayoutModule, ScrollNearEndDirective],
  styleUrls: ['./date-page.component.scss'],
})
export class DatePageComponent implements OnInit {
  pageSize = DEFAULT_PAGE_SIZE;
  page$ = new BehaviorSubject(1);
  items$: Observable<Item[]> = of([]);
  small$: Observable<boolean> = of(false);
  title = '';
  date = '';
  // pagedItems$: Observable<PagedItemResult> = of({} as PagedItemResult); // or null?
  isLoading = true;
  entities: Item[] = [];

  constructor(private _route: ActivatedRoute, private _pagedItemsService: PagedItemsService, private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.date = this._route.snapshot.params['date'];
    if (!this.date) throw Error('Date must be provided');

    this.small$ = this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map((result) => result.matches));

    this.loadPagedItems();
  }

  // loadPagedItems$(): Observable<PagedItemResult> {
    loadPagedItems(): void {
     defer(() => {
      this.isLoading = true;
      console.log('defer called');
      return this.page$.pipe(
        switchMap((page) => {
          return this._pagedItemsService.getPagedItems$(this.date, page, this.pageSize).pipe(
            map((pagedItemResult: PagedItemResult) => {
              this.entities = [...this.entities, ...pagedItemResult.entities];
            })
          );
        })
      );
    }).pipe(
      take(1),
      finalize(() => {
        this.isLoading = false;
        console.log('finalize called');
      })
    ).subscribe();
  }

  onNearEndScroll(): void {
    if (this.isLoading) return;

    this.page$.next(this.page$.value + 1);
    this.loadPagedItems();

    console.log('onNearEndScroll - page: ', this.page$.value);
  }
}
