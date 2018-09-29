import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import RxUser from '../schema/user';


import { AngularFirestore } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import PlantifyUser from '../schema/user';




@Injectable({ providedIn: 'root' })
export class ProfileService {



    currentUser: PlantifyUser;

    constructor(
        private db: AngularFirestore,
        private notifyService: NotifyService) {


    }


    getByEmail(email: string): Promise<PlantifyUser | void> {

        return new Promise<PlantifyUser | void>((resolve, reject) => {
            this.db.collection('users').ref.where('email', '==', email).get()

                .then((snapshot) => {
                    if (!snapshot.empty) {
                        resolve(<PlantifyUser>snapshot.docs.pop().data());
                    } else {
                        reject('could not find');
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });

    }


    getById(id: string): Promise<PlantifyUser | void> {

        return new Promise<PlantifyUser | void>((resolve, reject) => {
            this.db.collection('users').doc(id).ref.get()

                .then((snapshot) => {
                    if (snapshot.exists) {
                        resolve(<PlantifyUser>snapshot.data());
                    } else {
                        reject('could not find');
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });

    }


    // claimAccess(secretKey: string, id: string): Promise<RxUser | void> {

    //     return new Promise<RxUser | void>((resolve, reject) => {
    //         this.db.collection('users').ref.where('email', '==', email).get()

    //             .then((snapshot) => {
    //                 if (snapshot.empty) {
    //                     resolve(<RxUser>snapshot.docs.pop().data());
    //                 } else {
    //                     reject('could not find');
    //                 }
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             });
    //     });

    // }








}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
