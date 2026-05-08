import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HackerNewsService, Item } from 'src/typescript-angular-client-generated';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private _hackerNewsService = inject(HackerNewsService);

  getItemsByIds$(ids: number[]): Observable<Item[]> {
    const itemsQueries$ = ids.map((id: number) => this._hackerNewsService.getItem(id.toString()));
    return forkJoin(itemsQueries$);
  }
}
