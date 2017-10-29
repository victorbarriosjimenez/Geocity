import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';
import { User } from '../../models';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'
@Injectable()
export class AuthenticationService {
    public authState: any = null;
    constructor(private  afAuth: AngularFireAuth,
                private  _afDatabase: AngularFireDatabase, 
                private _router: Router,
                private _userService: UserService) 
                {          
                    this.afAuth.authState.subscribe((auth) => {
                        this.authState = auth
                    });                
    }  
    /* -------------------------------- Email Authentication Functions -------------------------------------- */ 
    public emailSignUp(userRegistrationForm) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userRegistrationForm.email, userRegistrationForm.password)
          .then((user)=> 
                { 
                    this.authState = user,
                    this._userService.createsUserAndInitialData(userRegistrationForm),
                    this._router.navigate(['/profile'])  
                }).catch(error => console.log(error));
    }
    public emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user,      
          this._router.navigate(['/profile'])
        }).catch(error => console.log(error));
    }
    public resetPasswordFromEmail(email: string) {
        const fbAuth = firebase.auth();
        return fbAuth.sendPasswordResetEmail(email)
          .then(() => console.log('email sent'))
          .catch((error) => console.log(error))
        } 
    public logoutfromGeocity(): void { 
        this.afAuth.auth.signOut();
        this._router.navigate(['/']);
    } 
    /* -------------------------------- OAuth Authentication Methods -------------------------------------- */ 
    public googleAccountLogin( ){
        const provider = new firebase.auth.GoogleAuthProvider();
         return this.otherApplicationsLogin(provider);
    }  
    public otherApplicationsLogin(provider : any){
            this.afAuth.auth.signInWithPopup(provider)
             .then((credential) => {
                          this.authState = credential.user,
                          this._router.navigate(['/profile']);
                 })
            .catch(error => console.log(error));
    }
    /*  -------------------------------- Getters for user authentication --------------------------------    */
    get authenticated(): boolean {
        return this.authState !== null;
    }
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    get currentUserEmail(): string {
        return this.authState.email;
    }
    get currentUserObservable(): any {
        return this.afAuth.auth
    }
}