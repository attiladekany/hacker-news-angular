import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { PagedItemResult } from 'src/app/models/paged-result.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/others/constants';
import { PagedItemsService } from 'src/app/services/paged-items.service';
import { PagedStore, PagedState } from 'src/app/pages/base-page/+state/paged-store.base';
import { Item } from 'src/typescript-angular-client-generated';

export const getInitialState = (date: string) => ({ ...INITIAL_STATE, date });

const INITIAL_STATE: ItemsState<Item> = {
  date: new Date().toISOString().slice(0, 10),
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  hasMore: true,
  isLoading: true,
  entities: [],
};

export interface ItemsState<T> extends PagedState<T> {
  date: string;
}

@Injectable()
export class ItemsStore extends PagedStore<Item, ItemsState<Item>> {
  private _pagedItemsService = inject(PagedItemsService);

  constructor() {
    super(INITIAL_STATE);
  }

  protected _loadPage(page: number) {
    const { date, size } = this.state();

    return this._pagedItemsService.getPagedItems$(date, page, size).pipe(
      tap((pagedItems: PagedItemResult) =>
        this.updateState({
          entities: pagedItems.entities,
          page: pagedItems.page,
          hasMore: pagedItems.hasMore,
        }),
      ),
    );
  }
}
