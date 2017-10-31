import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
@Injectable()
export class UserService {
    private firebaseUrl: string = 'https://geocity-app.firebaseio.com/';
    public authState: any = null;    
    public currentUser: any;
    constructor(private http: Http,
                private _afDatabase: AngularFireDatabase,
                private _afAuth: AngularFireAuth) { 
                 this._afAuth.authState.subscribe((auth) => {
                        this.authState = auth
                });
    }
    public createsUserAndInitialData(userstate,country,username){ 
        const path = `users/${userstate.uid}`; 
        const userRef: AngularFireObject<any> = this._afDatabase.object(path);    
        const data = {
            email: userstate.email,
            username: username,
            country: country,
            score: 0,
            profilePhotoUrl: 'http://voice4thought.org/wp-content/uploads/2016/08/default2-1.jpg'
        }
        userRef.update(data)
          .catch(error => console.log(error));
    }
    public updateUserInformation(userUpdateFormModel: User) {
        const path = `users/${this.currentUserId}`; 
        const userRef: AngularFireObject<any> = this._afDatabase.object(path);    
        const data = {
            username: userUpdateFormModel.username, 
            country: userUpdateFormModel.country,
            profilePhotoUrl: userUpdateFormModel.profilePhotoUrl
        }       
        return userRef.update(data);
    }
    public getUserData() { 
        const userDataPath = `https://geocity-app.firebaseio.com/users/${this.currentUserId}.json`;
        return this.http.get(userDataPath)
                  .map(response => response.json());
    }
    public sendsResetPasswordEmail(email: string) {
        const fbAuth = firebase.auth();
        return fbAuth.sendPasswordResetEmail(email)
          .then(() => console.log('email sent'))
          .catch((error) => console.log(error))
    } 
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    get authenticated(): boolean {
        return this.authState !== null;
    }
}