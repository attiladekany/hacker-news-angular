import { ResolveFn } from '@angular/router';
import { Observable, concatMap, from, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CacheStoriesService } from '../services/cache-stories.service';
import { URLPaths } from '../others/constants';

export interface ItemIds {
  ids: number[];
}

export const getJobIdsPageData: ResolveFn<number[]> = (): Observable<number[]> => {
  const _cacheStoriesService = inject(CacheStoriesService);

  const uri = URLPaths.JOB_STORIES;

  return _cacheStoriesService.askStoriesIds$.pipe(
    concatMap((ids) => {
      if (ids?.length) return of(ids);

      return from(
        fetch(uri, {
          headers: {
            // Servers use this header to decide on response body format.
            // "application/json" implies that we accept the data in JSON format.
            accept: 'text/html,application/json',
          },
        }).then((res) => {
          if (!res.ok) throw new Error(res.statusText);

          return res.json() as Promise<number[]>;
        })
      );
    }),
    tap((ids) => {
      _cacheStoriesService.setJobStories(ids);
    })
  );
};
