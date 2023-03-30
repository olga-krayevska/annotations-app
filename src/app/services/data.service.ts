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

  splitDocumentOnPages(text: string): string[] {
    const pages = [];
    const pageSize = 500;
    for(let i = 0; i < text.length; i += pageSize) {
      pages.push(text.slice(i, i + pageSize))
    }
   return pages;
  }

}
