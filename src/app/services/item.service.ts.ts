import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { HackerNewsService, Item } from 'src/typescript-angular-client-generated';
import { TopStoriesService } from './top-stories.service';

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
