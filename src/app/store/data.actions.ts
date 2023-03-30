import { createAction, props } from '@ngrx/store';
import { Annotation, DocumentModel } from '../models/data-interface';

export namespace appActions {
    export const loadDocuments = createAction(`Load Documents`);
    export const loadDocumentsSuccess = createAction(`Load Documents Success`, props<{ documents: DocumentModel[] }>());
    export const loadDocumentsFailure = createAction(`Load Documents Failure`);

    export const saveAnnotations = createAction(`Add Annotation`, props<{ id: string; annotations: Annotation[] }>())
    export const addImage = createAction(`Add Image`, props<{ id:string; image: File }>());
}