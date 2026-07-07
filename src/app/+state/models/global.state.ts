export interface GlobalState {
  isMobile: boolean;
  isDrawerOpened: boolean;
  layoutType: LayoutType;
  favoriteItemIds: number[];
}

export enum LayoutType {
  Card = 'card',
  Grid = 'grid',
}
