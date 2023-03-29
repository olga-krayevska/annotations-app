import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { appActions } from './data.actions' 
import { catchError, map, of, switchMap } from "rxjs";


@Injectable()
export class AppEffect {

    constructor( 
         private actions$: Actions,
         private dataService: DataService,
    ) {}

    loadDocuments$ = createEffect(() => this.actions$.pipe( 
        ofType(appActions.loadDocuments),
        switchMap(() => this.dataService.getData().pipe(
            map((documents) => { 
                return appActions.loadDocumentsSuccess({ documents })}),
            catchError(error => {
                alert(`Documents have not been loaded`)
                return of(appActions.loadDocumentsFailure());
            }           
        ))                   
    )))
}