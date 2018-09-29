import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import PlantifyUser from '../schema/user';
//import { MessageService } from './message.service';



import { AngularFirestore } from 'angularfire2/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { firebase } from '@firebase/app';



@Injectable({ providedIn: 'root' })
export class UserService {








  public authToken: string;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
   ) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authToken = currentUser && currentUser.authToken;
  }


  // 
  // public loginWithGoogle(): void {
  //     this.authService.googleLogin();
  // }
  // public loginWithFacebook(): void {
  //     this.authService.googleLogin();
  // }
  //
  // public loginAnonymously():void {
  //     this.afAuth.auth.signInAnonymously();
  // }
  // public logout(): void {
  //     // clear token remove user from local storage to log user out
  //     this.authToken = null;
  //     localStorage.removeItem('currentUser');
  // }



















  dpUrl: any;
  postDp(fileToUpload: File, authToken: string): Observable<any> {
    const url = `${this.dpUrl}?authToken=${authToken}`;
    const formData: FormData = new FormData();
    formData.append('dp', fileToUpload, fileToUpload.name);
    return this.http
      .post(url, formData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'reportProgress': 'true'
        })
      })
      .pipe(
        catchError(this.handleError<any>(`couldn't upload`))
      );
  }

  // /** PUT: update the hero on the server */
  // updateHero (user: User): Observable<any> {
  //   return this.http.put(this.usersUrl, user, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${user.id}`)),
  //     catchError(this.handleError<any>('updateUser'))
  //   );
  // }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return error.message;
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  //  this.messageService.add('UserService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
