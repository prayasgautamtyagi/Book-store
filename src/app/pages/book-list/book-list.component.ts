import { Component, OnInit } from '@angular/core';
import { HttpInterceptorService } from '../../core/http-interceptor.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  private bookName;
  private params;
  private bookList;
  private id;

  constructor(private http: HttpInterceptorService,private _cookie: CookieService) {
    this.bookName = 'harry potter';
    this.params = {
      q : 'harry potter',
      maxResults:25,
      orderBy:'relevance',
      printType:'books',
      startIndex:0
    }
   }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(){
    this.params.q = this.bookName;
    this.http.getDataWithParams('https://www.googleapis.com/books/v1/volumes', this.params).subscribe( (res) => {
      this.bookList = res.items;
    },
  (err) => {

  });
  }
  bookmarkIt(id) {
    let bookmarks = this._cookie.check('bookmarks') ? JSON.parse(this._cookie.get('bookmarks')) : [];
    let index = bookmarks.indexOf(id);
    if (index === -1) {
      bookmarks.push(id);
    }else{
      bookmarks.splice(index,1);
    }
    this._cookie.set('bookmarks', JSON.stringify(bookmarks));

  }
}
