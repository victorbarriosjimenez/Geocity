import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth, } from 'angularfire2/auth';
import { User } from '../../models';
import { Router } from '@angular/router'; 
import { UserService } from './user.service';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'

@Injectable()
export class AuthenticationService {
    public user: Observable<User>;
    public authState: any = null;
    constructor(private  afAuth: AngularFireAuth,
                private  _afStore, 
                private _router: Router,
                private _userService:  UserService 
            ) {
            this.user = this.afAuth.authState
                    .switchMap(user => {
                      if (user) {
                        return this._afStore.doc(`users/${user.uid}`).valueChanges()
                      } else {
                        return Observable.of(null)
                      }
                    });
    }  
    public logoutfromGeocity(){ 
        this.afAuth.auth.signOut();
        this._router.navigate(['/']);
    } 
    public googleAccountLogin( ){
        const provider = new firebase.auth.GoogleAuthProvider();
         return this.otherApplicationsLogin(provider);
    }  
    public otherApplicationsLogin(provider : any){
            this.afAuth.auth.signInWithPopup(provider)
             .then((credential) => {
                          this._userService.updateUserData(credential.user),
                          this.authState = credential.user
                          this._router.navigate(['/profile']);
                 })
            .catch(error => console.log(error));
    }

    /* Email Authentication Functions */ 
    public resetPasswordFromEmail(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
    } 
    public emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((user)=> 
                { 
                    this.authState = user,
                    this.updateUserData(user),
                    this._router.navigate(['/profile'])  
                }).catch(error => console.log(error));
    }
    public emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user,
          this.updateUserData(user),
          this._router.navigate(['/profile'])
        }).catch(error => console.log(error));
    }
    /* Getters for user authentication and showing credentials information */
    get authenticated(): boolean {
        return this.authState !== null;
    }
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
}