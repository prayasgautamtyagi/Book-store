import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { HttpInterceptorService } from './core/http-interceptor.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CommonModule,
    AppRoutingRoutingModule
  ],
  providers : [HttpInterceptorService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
