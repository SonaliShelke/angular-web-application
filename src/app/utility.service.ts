import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  headers: any;
  baseUrl: string = "https://jsonplaceholder.typicode.com/";
  params_object: any;
  id: number;

  extras: any;

  public setExtras(data) {
    this.extras = data;
  }

  public getExtras() {
    return this.extras;
  }



  constructor(private httpClient: HttpClient) {
    this.headers = new Headers();
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };




  get(params: string, options: any = this.headers): Observable<any> {
    let urlSearchParams = new URLSearchParams();
    //  urlSearchParams.append('api-key', this.params_object.API_KEY);
    //  urlSearchParams.append('format', this.params_object.FORMAT);
    //  urlSearchParams.append('offset', this.params_object.OFFSET);
    //  urlSearchParams.append('limit', this.params_object.LIMIT);

    return this.httpClient
      .get(this.baseUrl + params)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  getDetails(id: any, options: any = this.headers): Observable<any> {

    return this.httpClient.get(this.baseUrl + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }






  post(obj: any, options: any = this.headers): Observable<any> {
    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('api-key', this.params_object.API_KEY);
    //  urlSearchParams.append('format', this.params_object.FORMAT);
    //  urlSearchParams.append('offset', this.params_object.OFFSET);
    //  urlSearchParams.append('limit', this.params_object.LIMIT);

    return this.httpClient
      .post<any>(this.baseUrl, obj)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }


}
