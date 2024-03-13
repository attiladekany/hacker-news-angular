import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { GlobalState } from './models/global.state';
import { Store } from '@ngrx/store';

@Injectable()
export class GlobalEffects {
  constructor(private _store: Store<GlobalState>, private actions$: Actions) {}
}
