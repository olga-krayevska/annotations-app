import { createAction, props } from '@ngrx/store';
import { AnnotationModel, DocumentModel, PageModel } from '../models/data-interface';

export namespace docsActions {
    export const loadDocument = createAction(`Load Document`);
    export const loadDocumentSuccess = createAction(`Load Document Success`, props<{ documents: DocumentModel[] }>());
    export const loadDocumentFailure = createAction(`Load Document Failure`);

    export const saveAnnotations = createAction(`Save Annotation`, props<{ id: string; annotations: AnnotationModel[] }>())
}