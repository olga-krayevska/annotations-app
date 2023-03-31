import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DocumentModel } from '../models/data-interface';
import * as fromRoot from '../store/data.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private router: Router) { }

  displayedColumns = ['name']
  tableData: DocumentModel[] = [];

  documents$: Observable<DocumentModel[]> = this.store.select(fromRoot.getDocuments);

  ngOnInit():void {
    this.documents$.subscribe(data => { 
      this.tableData = data
    })
  }

  navigateToDocument(document: DocumentModel):void {
    this.router.navigate(['/document', document.id]);
  }

}  
