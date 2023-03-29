import { createAction, props } from '@ngrx/store';
import { DocumentModel } from '../models/data-interface';

export namespace appActions {
    export const loadDocuments = createAction(`Load Documents`);
    export const loadDocumentsSuccess = createAction(`Load Documents Success`, props<{ documents: DocumentModel[] }>());
    export const loadDocumentsFailure = createAction(`Load Documents Failure`);
}