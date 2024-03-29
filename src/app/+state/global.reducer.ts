import { createReducer, on } from '@ngrx/store';

import { GlobalActions } from './global.actions';
import { GlobalState, LayoutType } from './models/global.state';

export const initialState: Readonly<GlobalState> = {
  isMobile: true,
  isDrawerOpened: false,
  layoutType: LayoutType.Card,
};

export const globalReducer = createReducer(
  initialState,
  on(GlobalActions.setIsMobileView, (state, { isMobile }) => ({ ...state, isMobile })),
  on(GlobalActions.toggleDrawer, (state) => ({ ...state, isDrawerOpened: !state.isDrawerOpened })),
  on(GlobalActions.setLayoutType, (state, { layoutType }) => ({ ...state, layoutType }))
);
