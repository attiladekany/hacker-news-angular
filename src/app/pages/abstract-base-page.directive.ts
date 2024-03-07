import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ItemService } from '../services/item.service.ts';
import { Item } from 'src/typescript-angular-client-generated/index.js';
import { ItemIds } from '../models/item-ids.model.js';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive()
export abstract class AbstractBasePage implements OnInit {
  public readonly PAGE_SIZE = 15;
  entities$: Observable<Item[]> = of([]);
  title = '';

  constructor(private _route: ActivatedRoute, private _itemService: ItemService, private responsive: BreakpointObserver) {}

  ngOnInit(): void {

    const { ids } = this._route.snapshot.data as ItemIds;
    this.title = this._route.snapshot.routeConfig?.title as string;

    let itemIds = ids.splice(0, this.PAGE_SIZE);
    this.entities$ = this._itemService.getItemsByIds$(itemIds);

    this._itemService.getItemsByIds$(itemIds).subscribe((items) => {
      items.forEach((item) => {
        // console.log('item: ', item);
      });
    });
  }
}
