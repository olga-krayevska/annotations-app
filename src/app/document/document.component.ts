import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Annotation, DocumentModel } from '../models/data-interface';
import * as fromRoot from '../store/data.selectors'
import { appActions } from '../store/data.actions';
import { MatDialog } from '@angular/material/dialog';
import { AnnotationModalComponent } from '../annotation-modal/annotation-modal.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {}

  document: DocumentModel | undefined;
  subscription: Subscription = new Subscription();
  pages: string[] = [];
  currentPage = 1;
  annotation = false;
  draged: string = '';
  annotations: Annotation[] = [];
  scaleFactor = 1;
  file: any = undefined;
  
  ngOnInit(): void {
    this.store.dispatch(appActions.loadDocuments());
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
          this.splitDocumentOnPages(document[0].text);
        }        
      }
    ));
  }

  splitDocumentOnPages(text: string): void {
    const pages = [];
    const pageSize = 500;
    for(let i = 0; i < text.length; i += pageSize) {
      pages.push(text.slice(i, i + pageSize))
    }
   this.pages = pages;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  handleClick(event: MouseEvent): void {
    this.dialog.open(AnnotationModalComponent, { width: "500px"})
      .afterClosed().subscribe(data => {
        const annotation: Annotation = {
          id: new Date().toString(),
          text: data.annotation,
          page: this.currentPage,
          x: event.offsetX,
          y: event.offsetY
        }
        if(data.image){
          this.file = data.image;
        }
        this.annotations.push(annotation);
      })     
  }

  pageAnnotations(): Annotation[] {
    return this.annotations.filter(annotation => annotation.page === this.currentPage);
  }

  save(): void {
    if(this.document?.id) {
      this.store.dispatch(appActions.saveAnnotations({ id: this.document?.id, annotations: this.annotations }));
        if(this.file) {
          this.store.dispatch(appActions.addImage({ id: this.document?.id, image: this.file }))
        }
      } 
    this.router.navigate(['/annotations', this.document?.id]); 
  }

  removeAnnotation(annotation: Annotation): void {
    this.annotations = this.annotations.filter(a => a.id !== annotation.id)
  }

  removeFile(): void {
    this.file = undefined;
  }

  zoomIn(): void {
    this.scaleFactor += 0.1;
  }

  zoomOut(): void {
    this.scaleFactor -= 0.1;
  }

  goToNormalScale(): void {
    this.scaleFactor = 1;
  }
}

