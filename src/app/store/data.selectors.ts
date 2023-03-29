import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, appStateKey } from "./data.reducer";

const appSelector = createFeatureSelector<AppState>(appStateKey);

export const getDocuments = createSelector(appSelector, (state) => state.documents);

