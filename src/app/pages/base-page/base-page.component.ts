import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractBasePage } from './abstract-base-page.directive';
import { LayoutComponent } from '../layout-components/layout/layout.component';
import { ComponentStore } from '@ngrx/component-store';
import { BaseItemsStore } from './+state/base-item.store';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';

@Component({
  standalone: true,
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  imports: [LayoutComponent, CommonModule],
  styleUrls: ['./base-page.component.scss'],
  providers: [BaseItemsStore, ComponentStore],
})
export class BasePageComponent extends AbstractBasePage {
  readonly isLoading$ = this.store.select((state) => state.isLoading);
  readonly state$ = this.store.select((state) => state);

  constructor(
    protected override store: BaseItemsStore,
    protected override _itemService: ItemService,
    protected override _route: ActivatedRoute,
  ) {
    super(store, _route, _itemService);
  }

  async onNearEndScroll(): Promise<void> {
    const { page, isLoading, hasMore } = await firstValueFrom(this.state$);
    if (isLoading || !hasMore) return;
    this.store.patchState({ isLoading: true });

    this.store.getNextElements$(page + 1);
  }
}
