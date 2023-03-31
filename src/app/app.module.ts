import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffect } from './store/data.effects';
import { DocumentComponent } from './document/document.component';
import { AnnotationsComponent } from './annotations/annotations.component';
import { AnnotationModalComponent } from './annotation-modal/annotation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DocumentComponent,
    AnnotationsComponent,
    AnnotationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule,
    NgxPaginationModule,
    EffectsModule.forRoot([AppEffect]),
    StoreModule.forRoot(appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
