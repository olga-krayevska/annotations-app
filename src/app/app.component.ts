import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appActions } from './store/data.actions';
import { AppState } from './store/data.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  title = 'annotations-app';

  ngOnInit(): void {
    this.store.dispatch(appActions.loadDocuments());
    debugger;
  }
}
