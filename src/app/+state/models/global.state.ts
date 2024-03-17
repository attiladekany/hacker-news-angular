export interface GlobalState {
  isMobile: boolean;
  isDrawerOpened: boolean;
  layoutType: LayoutType
}

export enum LayoutType {
  Card = 'card',
  Grid = 'grid',
}
