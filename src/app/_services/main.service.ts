import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({ providedIn: 'root' })
export class MainService {




    constructor(
        private db: AngularFirestore) {


    }





    getByIdAndCollection(collection: string, id: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            this.db.collection(collection).doc(id).ref.get()

                .then((snapshot) => {
                    if (snapshot.exists) {
                        resolve(snapshot.data());
                    } else {
                        reject('could not find');
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });

    }


getUserCollection(collection: string,userId :string): Promise<any[]> {

    return new Promise<any>((resolve, reject) => {
        this.db.collection(collection).ref.where('authorId', '==', userId).get()

            .then((snapshot) => {
                if (!snapshot.empty) {
                    const result: any[] = [];
                    snapshot.docs.forEach(doc => {
                        result.push(doc.data());
                    });

                    resolve(result);
                } else {
                    reject('could not find');
                }
            })
            .catch(err => {
                reject(err);
            });
    });

}


    getCollection(collection: string): Promise<any[]> {

        return new Promise<any>((resolve, reject) => {
            this.db.collection(collection).ref.get()

                .then((snapshot) => {
                    if (!snapshot.empty) {
                        const result: any[] = [];
                        snapshot.docs.forEach(doc => {
                            result.push(doc.data());
                        });

                        resolve(result);
                    } else {
                        reject('could not find');
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });

    }




    getDocument(path: string): Promise<any[]> {

        return new Promise<any>((resolve, reject) => {
            this.db.doc(path).ref.get()

                .then((snapshot) => {
                    if (snapshot.exists) {
                        resolve(snapshot.data());
                    } else {
                        reject('could not find');
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });

    }



}

