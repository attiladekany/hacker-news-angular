import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, exhaustMap, switchMap, tap, throwError } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from 'src/app/others/constants';
import { ItemService } from 'src/app/services/item.service.ts';
import { PagedItemsService } from 'src/app/services/paged-items.service';
import { Item } from 'src/typescript-angular-client-generated';

const INITIAL_STATE: BaseItemsState<Item> = {
  ids: [],
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  hasMore: true,
  isLoading: true,
  entities: [],
};

export interface BaseItemsState<T> {
  ids: number[];
  page: number;
  size: number;
  hasMore: boolean;
  isLoading: boolean;
  entities: T[];
}

@Injectable()
export class BaseItemsStore extends ComponentStore<BaseItemsState<Item>> {
  constructor(private _pagedItemsService: PagedItemsService, private _itemService: ItemService) {
    super(INITIAL_STATE);
  }

  readonly loadInitialPageData$ = this.effect<void>(
    // The name of the source stream doesn't matter: `trigger$`, `source$` or `$` are good
    // names. We encourage to choose one of these and use them consistently in your codebase.
    (trigger$) =>
      trigger$.pipe(
        exhaustMap(() => {
          const { ids, size, page } = this.state();
          const nextIds = ids.splice(0, size);
          const hasMore = nextIds.length === size;
          return this._itemService.getItemsByIds$(nextIds).pipe(
            tapResponse({
              next: (entities: Item[]) => {
                this._addEntities(entities);
                this.patchState({ page, hasMore });
              },
              error: (e) => throwError(() => e),
            })
          );
        })
      )
  );

  readonly getNextElements$ = this.effect((page$: Observable<number>) => {
    return page$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((pageParam) => {
        const { page, size } = this.state();
        const allIds = this.state().ids;
        const offset = (page - 1) * size;
        const { ids, hasMore } = this.applyPaging(allIds, offset, size);
        if (!hasMore) {
          this.patchState({ hasMore, isLoading: false });
          return EMPTY;
        }

        console.log('hasMore');

        return this._itemService.getItemsByIds$(ids).pipe(
          //👇 Act on the result within inner pipe.
          tap({
            next: (entities: Item[]) => {
              this._updateState({ entities, page: pageParam, hasMore });
            },
            error: (e) => throwError(() => e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY)
        );
      })
    );
  });

  readonly _addEntities = this.updater((state, entities: Item[]) => {
    return {
      ...state,
      isLoading: false,
      entities: [...state.entities, ...entities],
    };
  });

  readonly _updateState = this.updater(
    (
      state,
      pagedItemResult: {
        entities: Item[];
        page: number;
        hasMore: boolean;
      }
    ) => {
      const { hasMore, page, entities } = pagedItemResult;
      return {
        ...state,
        page,
        hasMore,
        isLoading: false,
        entities: [...state.entities, ...entities],
      };
    }
  );

  applyPaging(ids: number[], offset: number, size: number): { ids: number[]; hasMore: boolean } {
    if (offset > ids.length) {
      offset = ids.length - size;
    }

    const pagedIds = [...ids].splice(offset, size);

    return { ids: pagedIds, hasMore: ids.indexOf(pagedIds[pagedIds.length - 1]) + 1 < ids.length };
  }
}
