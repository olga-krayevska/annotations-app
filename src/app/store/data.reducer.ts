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
    on(appActions.loadDocumentsSuccess, (state, { documents })  => {
        return { ...state, documents }
    }),

    on(appActions.saveAnnotations, (state, { id, annotations })  => {
        let documents = [...state.documents];
        documents = documents.map((doc: DocumentModel) => {
            if(doc.id === id) {
                doc = { ...doc, annotations }
            }
            return doc;
        })
        return { ...state,  documents }
    }),
    on(appActions.addImage, (state, { id, image })  => {
        let documents = [...state.documents];
        documents = documents.map((doc: DocumentModel) => {
            if(doc.id === id) {
                doc = { ...doc, image }
            }
            return doc;
        })
        return { ...state,  documents }
    }),   
)

