import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth, } from 'angularfire2/auth';
import { User } from '../../models';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'
 
@Injectable()
export class UserService {
    constructor(private http: Http,
                private _afStore: AngularFirestore) { 
    }
    public  updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this._afStore.doc(`users/${user.uid}`);
        const data = {
             uid: user.uid,
             email: user.email,
             displayName: user.displayName
        }
        return userRef.set(data)
    }

}
