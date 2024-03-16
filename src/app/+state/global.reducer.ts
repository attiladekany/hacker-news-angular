import { createReducer, on } from '@ngrx/store';

import { GlobalActions } from './global.actions';
import { GlobalState } from './models/global.state';

export const initialState: Readonly<GlobalState> = {
  isMobile: true,
  isDrawerOpened: false
};

export const globalReducer = createReducer(
  initialState,
  on(GlobalActions.setIsMobileView, (state, { isMobile }) => ({ ...state, isMobile })),
  on(GlobalActions.toggleDrawer, (state) => ({ ...state, isDrawerOpened:  !state.isDrawerOpened }))
);
