import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { PagedItemResult } from '../models/paged-result.model';
import { URLPaths } from '../others/constants';

@Injectable({
  providedIn: 'root',
})
export class PagedItemsService {
  getPagedItems$(date: string, page: number, size: number): Observable<PagedItemResult> {
    const url = URLPaths.getPagedItemsUrl(date, page, size);
    return from(getPagedItemsByUrl$(url));
  }
}

const getPagedItemsByUrl$ = (url: string): Promise<PagedItemResult> =>
  fetch(url, {
    headers: {
      accept: 'text/html,application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText);

    return res.json() as Promise<PagedItemResult>;
  });
