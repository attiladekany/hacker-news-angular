import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, exhaustMap, switchMap } from 'rxjs';

export interface PagedState<T> {
  page: number;
  size: number;
  hasMore: boolean;
  isLoading: boolean;
  entities: T[];
}

export abstract class PagedStore<T, S extends PagedState<T>> extends ComponentStore<S> {
  protected constructor(initialState: S) {
    super(initialState);
  }

  readonly loadInitialPageData$ = this.effect<void>((trigger$) =>
    trigger$.pipe(exhaustMap(() => this._loadPage(this.state().page).pipe(catchError(this._onLoadError)))),
  );

  readonly getNextElements$ = this.effect<number>((page$) =>
    page$.pipe(switchMap((page) => this._loadPage(page).pipe(catchError(this._onLoadError)))),
  );

  protected readonly updateState = this.updater((state: S, next: { entities: T[]; page: number; hasMore: boolean }) => ({
    ...state,
    page: next.page,
    hasMore: next.hasMore,
    isLoading: false,
    entities: [...state.entities, ...next.entities],
  }));

  protected abstract _loadPage(page: number): Observable<unknown>;

  private readonly _onLoadError = (error: unknown) => {
    console.error('PagedStore load failed', error);
    return EMPTY;
  };
}
