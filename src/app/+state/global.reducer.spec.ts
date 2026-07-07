import { GlobalActions } from './global.actions';
import { globalReducer, initialState } from './global.reducer';

describe('globalReducer', () => {
  it('toggles favorite item ids', () => {
    const firstToggle = globalReducer(initialState, GlobalActions.toggleFavoriteItem({ itemId: 42 }));

    expect(firstToggle.favoriteItemIds).toEqual([42]);

    const secondToggle = globalReducer(firstToggle, GlobalActions.toggleFavoriteItem({ itemId: 42 }));

    expect(secondToggle.favoriteItemIds).toEqual([]);
  });

  it('removes favorite item ids', () => {
    const stateWithFavorite = globalReducer(initialState, GlobalActions.toggleFavoriteItem({ itemId: 42 }));
    const stateWithoutFavorite = globalReducer(stateWithFavorite, GlobalActions.removeFavoriteItem({ itemId: 42 }));

    expect(stateWithoutFavorite.favoriteItemIds).toEqual([]);
  });
});
