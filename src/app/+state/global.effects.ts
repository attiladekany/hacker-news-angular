import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GlobalState } from './models/global.state';

@Injectable()
export class GlobalEffects {
  private _store = inject(Store<GlobalState>);
  private actions$ = inject(Actions);
}
