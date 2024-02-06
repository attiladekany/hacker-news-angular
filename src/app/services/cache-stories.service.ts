import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheStoriesService {
  private _topStoriesIds$ = new BehaviorSubject<number[]>([]);
  private _askStoriesIds$ = new BehaviorSubject<number[]>([]);
  private _showStoriesIds$ = new BehaviorSubject<number[]>([]);
  private _jobStoriesIds$ = new BehaviorSubject<number[]>([]);

  topStoriesIds$: Observable<number[]> = this._topStoriesIds$.asObservable();
  askStoriesIds$: Observable<number[]> = this._askStoriesIds$.asObservable();
  showStoriesIds$: Observable<number[]> = this._showStoriesIds$.asObservable();
  jobStoriesIds$: Observable<number[]> = this._jobStoriesIds$.asObservable();

  setTopStories(value: number[]) {
    this._topStoriesIds$.next(value);
  }

  setAskStories(value: number[]) {
    this._askStoriesIds$.next(value);
  }

  setShowStories(value: number[]) {
    this._showStoriesIds$.next(value);
  }

  setJobStories(value: number[]) {
    this._jobStoriesIds$.next(value);
  }
}
