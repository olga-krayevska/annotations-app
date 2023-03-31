import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import DOCUMENTS from '../mocks/mock-image.json'
import { DocumentModel, PageModel } from '../models/data-interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { }

  documents: DocumentModel[] = DOCUMENTS;

  getData(): Observable<DocumentModel[]> {
    return of(this.documents);
  }
}
