import { ResolveFn } from '@angular/router';
import { Observable, concatMap, from, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CacheStoriesService } from '../services/cache-stories.service';
import { URLPaths } from '../others/constants';
import { getItems$ } from './helpers';

export const getShowIdsPageData: ResolveFn<number[]> = (): Observable<number[]> => {
  const _cacheStoriesService = inject(CacheStoriesService);

  const uri = URLPaths.SHOW_STORIES;

  return _cacheStoriesService.askStoriesIds$.pipe(
    concatMap((ids) => {
      if (ids?.length) return of(ids);

      return from(getItems$(uri));
    }),
    tap((ids) => {
      _cacheStoriesService.setShowStories(ids);
    })
  );
};
