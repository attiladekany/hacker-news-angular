import { ResolveFn } from '@angular/router';
import { Observable, concatMap, of, tap } from 'rxjs';
import { HackerNewsService } from 'src/typescript-angular-client-generated';
import { inject } from '@angular/core';
import { CacheStoriesService } from '../services/cache-stories.service';

export interface ItemIds {
  ids: number[];
}

export const getItemIdsPageData: ResolveFn<number[]> = (): Observable<number[]> => {
  const _hackerNewsService = inject(HackerNewsService);
  const _cacheStoriesService = inject(CacheStoriesService);

  return _cacheStoriesService.topStoriesIds$.pipe(
    concatMap((ids) => {
      if (ids?.length) return of(ids);

      return _hackerNewsService.getTopStories().pipe(
        tap((ids: number[]) => {
          _cacheStoriesService.setTopStories(ids);
        })
      );
    })
  );
};
