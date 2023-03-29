import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import DOCUMENTS from '../mocks/mock-data.json'
import { DocumentModel } from '../models/data-interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { }

  documents = DOCUMENTS;

  getData(): Observable<DocumentModel[]> {
    return of(this.documents);
  }
}
