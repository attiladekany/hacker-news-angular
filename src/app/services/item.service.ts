import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HackerNewsService, Item } from 'src/typescript-angular-client-generated';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private _hackerNewsService: HackerNewsService) {}

  getItemsByIds$(ids: number[]): Observable<Item[]> {
    let itemsQueries$ = ids.map((id: number) => this._hackerNewsService.getItem(id.toString()));
    return forkJoin(itemsQueries$);
  }
}
