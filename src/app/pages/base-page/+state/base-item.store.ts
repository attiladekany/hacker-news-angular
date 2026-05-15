import { Injectable, inject } from '@angular/core';
import { EMPTY, tap } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from 'src/app/others/constants';
import { ItemService } from 'src/app/services/item.service';
import { PagedStore, PagedState } from 'src/app/pages/base-page/+state/paged-store.base';
import { Item } from 'src/typescript-angular-client-generated';

const INITIAL_STATE: BaseItemsState<Item> = {
  ids: [],
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  hasMore: true,
  isLoading: true,
  entities: [],
};

export interface BaseItemsState<T> extends PagedState<T> {
  ids: number[];
}

@Injectable()
export class BaseItemsStore extends PagedStore<Item, BaseItemsState<Item>> {
  private _itemService = inject(ItemService);

  constructor() {
    super(INITIAL_STATE);
  }

  protected _loadPage(page: number) {
    const { ids, size } = this.state();
    const offset = (page - 1) * size;
    const pagedIds = ids.slice(offset, offset + size);
    const hasMore = offset + size < ids.length;

    if (!pagedIds.length) {
      this.patchState({ hasMore: false, isLoading: false });
      return EMPTY;
    }

    return this._itemService.getItemsByIds$(pagedIds).pipe(tap((entities: Item[]) => this.updateState({ entities, page, hasMore })));
  }
}
