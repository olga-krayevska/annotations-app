import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AnnotationModel, DocumentModel, PageModel } from '../models/data-interface';
import * as fromRoot from '../store/data.selectors'

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  docId: string | undefined;
  subscription: Subscription = new Subscription();
  pages: PageModel[] = [];
  annotations: AnnotationModel[] = [];
  displayedColumns = ['type', 'text', 'image', 'x', 'y', 'page'];

  ngOnInit() {
    this.subscription.add(this.route.params.subscribe(params => {
      if(params['id']) {
        const id = params['id'];
        this.getDocument(id);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDocument(id: string): void {
    this.subscription.add(this.store.select(fromRoot.getDocumentById(id)).subscribe(
      document => {
        if(document){
          this.pages = document.pages;

          if(document.annotations) {
            this.annotations = document.annotations;
          }
        }        
      }
    ));
  }

  goHome(): void {
    this.router.navigate(['']);
  }

}
