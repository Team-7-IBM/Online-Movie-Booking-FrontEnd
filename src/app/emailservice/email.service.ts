import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EmailSenderService } from './email';
import { Observable, pipe, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/**
 * @author Mouli Roy
 */
export class EmailService {
  private url = 'http://localhost:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  sendEmail(cust:number): Observable<any> {
    return this.httpClient.get<EmailSenderService>(this.url + '/email/send?cust=' + cust)
    .pipe(catchError(this.handleError));
 }

 sendTktEmail(cust:number): Observable<any> {
  return this.httpClient.get<EmailSenderService>(this.url + '/tkt/sendticket?cust=10')
  .pipe(catchError(this.handleError));
 }
 handleError(eResponse: HttpErrorResponse) {
  if (eResponse.error instanceof ErrorEvent) {
    console.log('Client Side Error =' + eResponse.error.message);
    console.log('Status Code=' + eResponse.status);
  } else {
    console.log('Server Side Error =' + eResponse.error.message);
    console.log('Status Code=' + eResponse.status);
  }
  return throwError(eResponse.error.message);
}
}
