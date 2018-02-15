import { Component, OnInit } from '@angular/core';
import { HttpInterceptorService } from '../../core/http-interceptor.service';
import { Router } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component'
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  private book;
  private id;
  constructor(
    private http: HttpInterceptorService,
    private _router: Router,
    private router: ActivatedRoute,
    private _cookie: CookieService
  ) {
    this.router.params.subscribe((data) => {
      console.log(data);
      this.id = data.id;
    });
  }

  ngOnInit() {
    this.fetchBook();
  }
  OnBack(): void {
    this._router.navigate(['/books']);
  }
  fetchBook() {
    this.http.getData('https://www.googleapis.com/books/v1/volumes/' + this.id).subscribe((res) => {
      this.book = res;
      console.log(res);
    });
  }

  bookmarkIt() {
    let bookmarks = this._cookie.get('bookmarks') ? JSON.parse(this._cookie.get('bookmarks')) : [];
    if (bookmarks.indexOf(this.id) === -1) {
      bookmarks.push(this.id);
      this._cookie.set('bookmarks', JSON.stringify(bookmarks));
    }

  }

}
