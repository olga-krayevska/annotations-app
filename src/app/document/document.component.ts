import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { DocumentModel } from '../models/data-interface';
import * as fromRoot from '../store/data.selectors'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  document: DocumentModel | undefined;
  subscription: Subscription = new Subscription();
  pages: string[] = [];
  currentPage = 0;
  
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
}
