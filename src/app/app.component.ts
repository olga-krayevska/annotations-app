import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { docsActions } from './store/data.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  title = 'annotations-app';

  ngOnInit(): void {
     this.store.dispatch(docsActions.loadDocument());
  }
}
