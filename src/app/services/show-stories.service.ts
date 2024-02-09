import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, from, of, tap } from 'rxjs';
import { IItemService } from '../interfaces/item.service.interface';
import { CacheStoriesService } from './cache-stories.service';
import { getItemIds$ } from '../resolvers/helpers';

@Injectable({
  providedIn: 'root',
})
export class ShowStoriesService implements IItemService {
  private _cacheStoriesService = inject(CacheStoriesService);

  getItemIds$(uri: string): Observable<number[]> {
    return this._cacheStoriesService.showStoriesIds$.pipe(
      concatMap((x) => {
        if (x?.length) return of(x);

        return from(getItemIds$(uri));
      }),
      tap((ids: number[]) => {
        this._cacheStoriesService.setShowStories(ids);
      })
    );
  }
}
