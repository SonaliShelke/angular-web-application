import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  headers: any;
  baseUrl: string = "https://jsonplaceholder.typicode.com/";

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  extras: any;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.headers = new Headers();
  }

  public setExtras(data) {
    this.extras = data;
  }

  public getExtras() {
    return this.extras;
  }

  public setUserData(params: string, formValue: any) {
    localStorage.setItem(params, JSON.stringify(formValue));
  }

  public getUserData(params: string) {
    return JSON.parse(localStorage.getItem(params));
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

  post(params: string, obj?: any, options: any = this.headers): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + params, obj)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  put(params: string, dataObj?: any, options: any = this.headers): Observable<any> {
    return this.httpClient
      .put<any>(this.baseUrl + params, dataObj)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  delete(params: string, dataObj?: any, options: any = this.headers): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + params, dataObj)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
