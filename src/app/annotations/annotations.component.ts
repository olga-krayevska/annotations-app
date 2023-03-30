import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Annotation, DocumentModel } from '../models/data-interface';
import { DataService } from '../services/data.service';
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
    private dataService: DataService,
  ) {}

  docId: string | undefined;
  document: DocumentModel | undefined;
  subscription: Subscription = new Subscription();
  pages: string[] = [];
  currentPage = 1;
  tableData: Annotation[] = [];
  displayedColumns = ['id', 'text', 'x', 'y', 'page'];
  image: any = undefined;

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
        if(document[0]){
          this.document = document[0];
          this.pages = this.dataService.splitDocumentOnPages(document[0].text);
          if(this.document?.annotations) {
            this.tableData = this.document?.annotations;
          }
          if(this.document?.image) {
            this.image = this.document?.image;
          }
        }        
      }
    ));
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
  }

  goHome(): void {
    this.router.navigate(['']);
  }

}
