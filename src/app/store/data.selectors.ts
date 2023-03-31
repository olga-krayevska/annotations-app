import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentModel, PageModel } from "../models/data-interface";
import { DocsState, docsStateKey } from "./data.reducer";

const appSelector = createFeatureSelector<DocsState>(docsStateKey);

export const getDocuments = createSelector(appSelector, (state) => {return state.data});

export const getDocumentById = (id: string) => createSelector(appSelector, (state) => {
    return state.data.find((doc: DocumentModel) => doc.id === id);
});


