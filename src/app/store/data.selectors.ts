import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentModel } from "../models/data-interface";
import { AppState, appStateKey } from "./data.reducer";

const appSelector = createFeatureSelector<AppState>(appStateKey);

export const getDocuments = createSelector(appSelector, (state) => state.documents);
export const getDocumentById = (id: string) => createSelector(appSelector, (state) => {
    console.log("ID ", id)
    return state.documents.filter((doc: DocumentModel) => doc.id === id);
});

