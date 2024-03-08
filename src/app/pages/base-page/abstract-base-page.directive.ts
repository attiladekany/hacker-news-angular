import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service.ts';
import { ItemIds } from '../../models/item-ids.model';
import { BaseItemsStore } from './+state/base-item.store';

@Directive()
export abstract class AbstractBasePage implements OnInit {
  readonly entities$ = this.store.select((state) => state.entities);

  title = '';

  constructor(protected store: BaseItemsStore, protected _route: ActivatedRoute, protected _itemService: ItemService) {}

  ngOnInit(): void {
    this.title = this._route.snapshot.routeConfig?.title as string;
    const { ids } = this._route.snapshot.data as ItemIds;
    this.store.patchState({ ids });
    console.log('length:', ids.length);


    this.store.loadInitialPageData$();
  }
}
