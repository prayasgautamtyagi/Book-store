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
  private pageNo;

  constructor(private http: HttpInterceptorService,private _cookie: CookieService) {
    this.bookName = 'harry potter';
    this.params = {
      q : 'harry potter',
      maxResults:20,
      orderBy:'relevance',
      printType:'books',
      startIndex:0
    };
    this.bookList = [];
    this.pageNo = 0;
   }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(){
    this.params.q = this.bookName;
    this.params.startIndex = this.pageNo * 20;
    
    this.http.getDataWithParams('https://www.googleapis.com/books/v1/volumes', this.params).subscribe( (res) => {
      this.bookList.push(...res.items);
      this.pageNo++;
    },
  (err) => {

  });
  }
  bookmarkIt(id) {
    let bookmarks = this._cookie.get('bookmarks') ? JSON.parse(this._cookie.get('bookmarks')) : [];
    if (bookmarks.indexOf(this.id) === -1) {
      bookmarks.push(this.id);
      this._cookie.set('bookmarks', JSON.stringify(bookmarks));
    }else{
      
    }

  }

  onScroll(){
    this.fetchBooks();
  }
  search(){
    this.bookList = [];
    this.pageNo = 0;
    this.fetchBooks();
  }
}
