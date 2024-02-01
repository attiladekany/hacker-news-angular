import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ItemIds } from 'src/app/resolvers/item-resolver';
import { ItemService } from 'src/app/services/item.service.ts';
import { Item } from 'src/typescript-angular-client-generated';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items$: Observable<Item[]> = of([]);

  constructor(private _route: ActivatedRoute, private _itemService: ItemService) {}

  ngOnInit(): void {
    const { ids } = this._route.snapshot.data as ItemIds;

    const count: number = 15;
    let itemIds = ids.splice(0, count);
    this.items$ = this._itemService.getItemsByIds$(itemIds);

    this._itemService.getItemsByIds$(itemIds).subscribe((items) => {
      items.forEach((item) => {
        console.log('item: ', item);
      });
    });
  }
}
