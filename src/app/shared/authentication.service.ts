import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { emailAndPasswordCredentials } from '../../models';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public authState: any = null;
    constructor(private  afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
            private _router: Router) {
        this.afAuth.authState.subscribe((auth) => {
                    this.authState = auth
        }); 
    }  
    public logoutfromGeocity(){ 
        this.afAuth.auth.signOut();
        this._router.navigate(['/']);
    } 
    public emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((user)=> 
                { 
                    this.authState = user,
                    this._router.navigate(['/profile'])  
                }).catch(error => console.log(error));
    }
    public emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    
        .then((user) => {
          this.authState = user
        }).catch(error => console.log(error));
    }
    public googleAccountLogin( ){
        const provider = new firebase.auth.GoogleAuthProvider();
         return this.otherApplicationsLogin(provider);
    }  
    public otherApplicationsLogin(provider : any){
            this.afAuth.auth.signInWithPopup(provider)
             .then((credential) => {
                          this.authState = credential.user
                          this._router.navigate(['/profile']);
                 })
            .catch(error => console.log(error));
    }
    resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
    }
    get authenticated(): boolean {
        return this.authState !== null;
    }
     get currentUser(): any {
        return this.authenticated ? this.authState : null;
     }
}