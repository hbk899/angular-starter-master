import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase2 from 'firebase';
import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';

import { switchMap, startWith, map, tap, filter } from 'rxjs/operators';

import { User } from 'firebase';

import { Upload } from './upload';
import { AngularFireStorage } from 'angularfire2/storage';


import PlantifyUser from '../schema/user';
import PlantifyTemplate from '../schema/PlatifyTemplate';

// interface User {
//   uid: string;
//   email?: string | null;
//   photoURL?: string;
//   displayName?: string;
// }

@Injectable()
export class AuthService {



  PlatifyingUser: Observable<PlantifyUser | null>;
  plantifyUser: PlantifyUser;




  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private notify: NotifyService) {


    this.startUserUpdates();
  }

  private startUserUpdates(): void {
    this.PlatifyingUser = this.afAuth.user.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap(user => {
        user = <PlantifyUser>user;
        if (user != null) {

        


          this.plantifyUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user);
        }

      }),
      startWith(JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : new PlantifyUser)
    );
  }



  ////// OAuth Methods /////
  googleLogin() {
    const provider = new firebase2.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }



  facebookLogin() {
    const provider = new firebase2.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to Plantify!!!', 'success');
        return credential;
      });
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {

        this.notify.update('Welcome to Plantify!!!', 'success');
        return credential;
      });
  }

  //// Email/Password Auth ////
  emailSignUp(newUser: PlantifyUser, password: string) {

    return this.afAuth.auth
      .createUserWithEmailAndPassword(newUser.email, password)
      .then(credential => {
        console.log(credential);
        newUser.id = credential.user.uid;



        return this.updateUserData(newUser);
      });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      // .then(credential => {
      //   return this.afs.doc(`users/${credential.user.uid}`).ref.get();
      // })
      .then(credentials => {

        // localStorage.setItem('currentUser', JSON.stringify(user.data));
        return credentials;
      })
      .then(user => {
        this.notify.update('Welcome to plantify!!!', 'success');
        return user;
      });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase2.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }





  getCurrentUsser(): PlantifyUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }



  // user related...


  updateIsDoctor(isReallyADoctor: boolean) {
    const a: any = {};
    a.isDoctor = isReallyADoctor;
    return this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).ref.update(a);
  }


  updateProfile(user: PlantifyUser) {
    const a: any = {};
    a.displayName = user.displayName;
    a.email=user.email;
    console.log("in auth update method");
    return this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).ref.update(JSON.parse(JSON.stringify(a)));
  }


  updateRxTemplate(temp: PlantifyTemplate, savePersonal: boolean) {
    const a: any = {};
    a['doctor.rxTemplate'] = JSON.parse(JSON.stringify(temp));
    if (savePersonal) {
      a['doctor.personalRxTemplate'] = JSON.parse(JSON.stringify(temp));
    }
    a['doctor.usingClinicRxTemplate'] = savePersonal;
    return this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).ref.update(a);
  }





  uploadDp(upload: Upload) {

    const ref = this.afStorage.ref(`userdps/${this.plantifyUser.id}`);
    return ref.put(upload.file)
      .then(snapshot => {
        console.log("dpupload method then 1");
        return snapshot.ref.getDownloadURL();
     
      })
      .then(downloadUrl => {
        console.log("dpupload method then 2");
        return this.saveDpSrc(downloadUrl);
      });


  }



  private saveDpSrc(url: string) {


    const a: any = {};
    a.dpSrc = url;
    return this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).ref.update(a)
      .then(() => {
        return url;
      });
  }






  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }


  public getLoggedInUpdates(): Observable<User> {
    return this.afAuth.user;
  }


  public getCurrentUserUpdates(): Observable<PlantifyUser> {
    return this.PlatifyingUser;
  }
  private updateUserData(user: PlantifyUser): Promise<any> {

    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.id}`
    );
    let temp: any = JSON.stringify(user);
    temp = JSON.parse(temp);
    if (!temp.createdAt) {
      temp.createdAt = firebase2.firestore.FieldValue.serverTimestamp();
    } else {
      temp.updatedAt = firebase2.firestore.FieldValue.serverTimestamp();
    }
    return userRef.set(temp);
  }
}
