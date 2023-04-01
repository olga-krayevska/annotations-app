import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AnnotationModel, PageModel } from '../models/data-interface';
import * as fromRoot from '../store/data.selectors'
import { docsActions } from '../store/data.actions';
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

  document: any;
  subscription: Subscription = new Subscription();
  annotations: AnnotationModel[] = [];
  scaleFactor = 1;
  pages: PageModel[] = [];
  startPos = { x: 0, y: 0 };
  
  ngOnInit(): void {
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
          this.document = document;
          this.pages = document.pages;
          this.annotations = [...document.annotations];
        }        
      }
    ));
  } 

  goHome(): void {
    this.router.navigate(['']);
  }

  handleClick(event: MouseEvent, page: number): void {
    this.dialog.open(AnnotationModalComponent)
      .afterClosed().subscribe(data => {

        const annotation: AnnotationModel = {
          id: new Date().toString(),
          type: data.image ? 'image' : 'text',
          page: page + 1,
          x: event.offsetX,
          y: event.offsetY
        }

        if (data.image){
          this.convertFileToBase64(data.image).then(base64Img => {
            annotation.image = base64Img;
            this.annotations.push(annotation);
          })
        } else {
          annotation.text = data.annotation;
          this.annotations.push(annotation);
        }
    })
  }

  convertFileToBase64(file:any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  filteredAnnotations(page: number): AnnotationModel[] {
    return this.annotations.filter(annotation => annotation.page === page)
  }

  save(): void {
    if(this.document?.id) {
      this.store.dispatch(docsActions.saveAnnotations({ id: this.document?.id, annotations: this.annotations }));
      this.router.navigate(['/annotations', this.document?.id]); 
    }      
    
  }

  removeAnnotation(annotationId: string): void {
    this.annotations = this.annotations.filter(annotation => annotation.id !== annotationId);
    this.store.dispatch(docsActions.saveAnnotations({ id: this.document?.id, annotations: this.annotations }));
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

  updateAnnotation({id, x, y}: {id: string; x: number; y: number }): void {
    let annotation = this.annotations.find(annotation => annotation.id === id);
    if(annotation) {
      annotation.x = x;
      annotation.y = y;
    }
  }

  onDragStart (event: MouseEvent): void {
    this.startPos.x = event.clientX;
    this.startPos.y = event.clientY;
  };

  onDragEnd (event: DragEvent, id: string): void {
  const endPos = { x: 0, y: 0 };
    endPos.x = event.clientX;
    endPos.y = event.clientY;
    const deltaX = endPos.x - this.startPos.x;
    const deltaY = endPos.y - this.startPos.y;
    
    const square = event.target as HTMLElement
    const currentTop = square.offsetTop;
    const currentLeft = square.offsetLeft;
        
    this.updateAnnotation({id,  x: currentLeft + deltaX, y: currentTop + deltaY })
  };
}

