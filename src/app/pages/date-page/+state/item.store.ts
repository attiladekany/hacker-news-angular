import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, exhaustMap, switchMap, tap, throwError } from 'rxjs';
import { PagedItemResult } from 'src/app/models/paged-result.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/others/constants';
import { PagedItemsService } from 'src/app/services/paged-items.service';
import { Item } from 'src/typescript-angular-client-generated';

const INITIAL_STATE: ItemsState<Item> = {
  date: new Date().toISOString().slice(0, 10),
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  hasMore: true,
  isLoading: true,
  entities: [],
};

export interface ItemsState<T> {
  date: string;
  page: number;
  size: number;
  hasMore: boolean;
  isLoading: boolean;
  entities: T[];
}

@Injectable()
export class ItemsStore extends ComponentStore<ItemsState<Item>> {
  constructor(private _pagedItemsService: PagedItemsService) {
    super(INITIAL_STATE);
  }

  readonly loadInitialPageData$ = this.effect<void>(
    // The name of the source stream doesn't matter: `trigger$`, `source$` or `$` are good
    // names. We encourage to choose one of these and use them consistently in your codebase.
    (trigger$) =>
      trigger$.pipe(
        exhaustMap(() => {
          const { date, page, size } = this.state();
          return this._pagedItemsService.getPagedItems$(date, page, size).pipe(
            tapResponse({
              next: (pagedItems: PagedItemResult) => this._addEntities(pagedItems),
              error: (e) => throwError(() => e),
            })
          );
        })
      )
  );

  readonly getNextElements$ = this.effect((page$: Observable<number>) => {
    const { date, size } = this.state();
    return page$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((page) =>
        this._pagedItemsService.getPagedItems$(date, page, size).pipe(
          //👇 Act on the result within inner pipe.
          tap({
            next: (pagedItems: PagedItemResult) => this._addEntities(pagedItems),
            error: (e) => throwError(() => e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly _addEntities = this.updater((state, pagedItemResult: PagedItemResult) => {
    const { hasMore, page, entities } = pagedItemResult;
    return {
      ...state,
      isLoading: false,
      page,
      hasMore,
      entities: [...state.entities, ...entities],
    };
  });

  //not used
  selectItem(id: number) {
    return this.select((state) => state.entities.find((e) => e.id === id));
  }
}
