import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpInterceptorService {
  options = null;
  constructor(
    private http: Http,
    private router: Router) {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.options = new RequestOptions({
      headers: headers
    });
  }

  getDataWithParams(url: string, data: any) {
    let params: URLSearchParams = new URLSearchParams();
    let keys = Object.keys(data);

    for (let prop of keys) {
      params.set(prop, data[prop]); 
    }

    this.options.search = params;
    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getData(url: string): Observable<any> {
    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError.bind(this));
  }

  postData(url: string, data: any): Observable<any> {
    return this.http.post(url, JSON.stringify(data), this.options)
      .map(this.extractData)
      .catch(this.handleError.bind(this));

  }

  putData(url: string, data: any): Observable<any> {
    return this.http.put(url, JSON.stringify(data), this.options)
      .map(this.extractData)
      .catch(this.handleError.bind(this));

  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error.status && error.status === 403) {
      this.router.navigate(['/unauthorized']);
      return;
    }

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
