import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { AbstractBasePage } from './abstract-base-page.directive';
import { LayoutComponent } from '../layout-components/layout/layout.component';
import { ComponentStore } from '@ngrx/component-store';
import { BaseItemsStore } from './+state/base-item.store';
import { ItemService } from 'src/app/services/item.service.ts';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';

@Component({
  standalone: true,
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  imports: [LayoutComponent, CommonModule, CardComponent, DatePickerComponent],
  styleUrls: ['./base-page.component.scss'],
  providers: [BaseItemsStore, ComponentStore],
})
export class BasePageComponent extends AbstractBasePage {
  readonly isLoading$ = this.store.select((state) => state.isLoading);
  readonly state$ = this.store.select((state) => state);

  constructor(
    protected override store: BaseItemsStore,
    protected override _itemService: ItemService,
    protected override _route: ActivatedRoute
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
