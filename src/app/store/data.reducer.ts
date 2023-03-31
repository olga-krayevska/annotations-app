import {  createReducer, on } from '@ngrx/store';
import { DocumentModel } from '../models/data-interface';
import { docsActions } from './data.actions';


export interface DocsState {
    data: DocumentModel[];
  }

export const initialState: DocsState = {
    data: []
};

export const docsStateKey = 'documents';

export const docsReducer = createReducer(

    initialState,

    on(docsActions.loadDocumentSuccess, (state, { documents })  => {
        return { ...state, data: documents }
    }),

    on(docsActions.saveAnnotations, (state, { id, annotations })  => {
        let documents = state.data.map(doc => {
                if(doc.id === id) {
                    return {...doc, annotations}
                }
                return doc; 
            });
        return { ...state,  data: documents }
    })    
)

