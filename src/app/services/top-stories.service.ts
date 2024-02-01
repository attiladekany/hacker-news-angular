import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopStoriesService {
  setTopStories(value: number[]) {
    this._topStoriesIds$.next(value);
  }
  private _topStoriesIds$ = new BehaviorSubject<number[]>([]);
  topStoriesIds$: Observable<number[]> = this._topStoriesIds$.asObservable();
}
