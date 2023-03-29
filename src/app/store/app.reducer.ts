import { ActionReducerMap } from '@ngrx/store';
import { appStateKey } from './data.reducer';
import { AppState as DocumentsState, appReducer as docReducer } from './data.reducer'

interface AppState {
  [appStateKey]: DocumentsState;  
}

export const appReducer: ActionReducerMap<AppState, any> = {
    [appStateKey]: docReducer
};
