import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GlobalActions = createActionGroup({
  source: 'Global',
  events: {
    'Set is mobile view': props<{ isMobile: boolean }>(),
    'Toggle drawer': emptyProps(),
  },
});
