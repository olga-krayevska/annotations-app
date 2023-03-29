import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import { DocumentModel } from '../models/data-interface';
import { appActions } from './data.actions';


export interface AppState {
    documents: any;
  }

export const initialState: AppState = {
    documents: []
};
export const appStateKey = 'documents';

export const appReducer = createReducer(
    initialState,
    on(appActions.loadDocumentsSuccess, (state, {documents})  => {
        console.log("REDUCER documents ", documents)
        return { ...state, documents }
    })
)
