import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractBasePage } from './abstract-base-page.directive';
import { LayoutComponent } from '../layout-components/layout/layout.component';
import { ComponentStore } from '@ngrx/component-store';
import { BaseItemsStore } from './+state/base-item.store';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html',
    imports: [LayoutComponent, CommonModule],
    styleUrls: ['./base-page.component.scss'],
    providers: [BaseItemsStore, ComponentStore]
})
export class BasePageComponent extends AbstractBasePage {
  override _store = inject(BaseItemsStore);
  readonly isLoading$ = this._store.select((state) => state.isLoading);
  override state$ = this._store.select((state) => state);

  override _itemService = inject(ItemService);
  override _route = inject(ActivatedRoute);

  constructor() {
    super();
  }

  async onNearEndScroll(): Promise<void> {
    const { page, isLoading, hasMore } = await firstValueFrom(this.state$);
    if (isLoading || !hasMore) return;
    this._store.patchState({ isLoading: true });

    this._store.getNextElements$(page + 1);
  }
}
