import { ActionReducerMap } from '@ngrx/store';
import { DocsState, docsStateKey } from './data.reducer';
import { docsReducer } from './data.reducer'

export interface AppState {
  [docsStateKey]: DocsState;  
}

export const appReducer: ActionReducerMap<AppState, any> = {
    [docsStateKey]: docsReducer
};
