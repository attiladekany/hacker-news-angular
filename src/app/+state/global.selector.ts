import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GlobalState } from './models/global.state';
export const GLOBAL_FEATURE_KEY = 'global';

export const state = createFeatureSelector<Readonly<GlobalState>>(GLOBAL_FEATURE_KEY);

export const selectIsMobile$ = createSelector(state, (state) => {
  return state.isMobile;
});

export const selectIsDrawerOpened$ = createSelector(state, (state) => {
  return state.isDrawerOpened;
});
