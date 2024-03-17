import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LayoutType } from './models/global.state';

export const GlobalActions = createActionGroup({
  source: 'Global',
  events: {
    'Set is mobile view': props<{ isMobile: boolean }>(),
    'Toggle drawer': emptyProps(),
    'Set layout type': props<{ layoutType: LayoutType }>(),
  },
});
