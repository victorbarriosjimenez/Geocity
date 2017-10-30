import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
/*
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from './user.service';
import { User } from '../../models';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap'*/
/*
interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
    username: string;
  }
@Injectable()
export class AuthenticationService {
    public authState: any = null;
    public user: Observable<User>;
    constructor(private  afAuth: AngularFireAuth,
                private  _afStore: AngularFirestore, 
                private _router: Router,
                private _userService: UserService) 
                {           
                    this.user = this.afAuth.authState
                    .switchMap(user => {
                      if (user) {
                        return this._afStore.doc<User>(`users/${user.uid}`).valueChanges()
                      } else {
                        return Observable.of(null)
                      }
                    })
    }  
/*
    /* -------------------------------- Email Authentication Functions -------------------------------------- */ 
/*    public emailSignUp(userForm) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userForm.email,userForm.password)
          .then((user)=> 
                { 
                    this.authState = user,
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
    } */
    /* -------------------------------- OAuth Authentication Methods -------------------------------------- */ 
 /*   public googleAccountLogin( ){
        const provider = new firebase.auth.GoogleAuthProvider();
         return this.otherApplicationsLogin(provider);
    }  
    public otherApplicationsLogin(provider : any){
            this.afAuth.auth.signInWithPopup(provider)
             .then((credential) => {
                          this.authState = credential.user,
                          this.updateUserData(credential.user)
                          this._router.navigate(['/profile']);
                 })
            .catch(error => console.log(error));
    }
    private updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this._afStore.doc(`users/${user.uid}`);
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          username: user.username,
          photoURL: user.photoURL
        }
        return userRef.set(data)
      }
      */
    /*  -------------------------------- Getters for user authentication --------------------------------    */
 /*   get authenticated(): boolean {
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
}*/