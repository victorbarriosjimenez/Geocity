import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { User } from '../../models';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'
@Injectable()
export class AuthenticationService {
    public authState: any = null;
    private _firebaseAuthentication = firebase.auth();
    public user: Observable<User>;
    constructor(private  afAuth: AngularFireAuth,
                private  _afStore: AngularFireDatabase, 
                private _router: Router,
                private _userService: UserService) 
                {           
                  this.afAuth.authState.subscribe((auth) => {
                    this.authState = auth
                }); 
    }  
    /* -------------------------------- Email Authentication Functions -------------------------------------- */ 
   public emailSignUp(userForm) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userForm.email,userForm.password)
          .then((user)=> 
                { 
                    this.authState = user,
                   // this._firebaseAuthentication.currentUser.sendEmailVerification(userForm.email),
                    this._userService.createsUserAndInitialData(user,userForm.country,userForm.username),
                    this._router.navigate(['/profile']);
                }).catch(error => console.log(error));
    }
    public emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user,      
          this._router.navigate(['/profile'])
        }).catch(error => console.log(error));
    }
    public logoutfromGeocity(): void { 
        this.afAuth.auth.signOut().then(
            () => { 
                this._userService.userEditionControl(true),
                this._router.navigate(['/'])
        });
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