import { Component, OnInit } from '@angular/core';
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

  constructor(private store: Store) { }

  displayedColumns = ['name', 'annotation']
  dataSource = [
    {
      name: 'first',
      annotation: 'annotation'
    },
    {
      name: 'second',
      annotation: null
    }
  ];
  documents$: Observable<DocumentModel[]> = this.store.select(fromRoot.getDocuments);

  ngOnInit():void {
    this.documents$.subscribe(data => console.log("DATA ----->>>> ", data))
  }
}
