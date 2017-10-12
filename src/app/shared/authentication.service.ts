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
              private router:Router) {
        this.afAuth.authState.subscribe((auth) => {
                    this.authState = auth
        }); 
    }  
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((user)=> 
                this.authState = user
          ).catch(error => console.log(error));
    }
    emailLogin(email: string, password: string) {
        return  this.afAuth.auth.signInWithEmailAndPassword(email, password)
    
        .then((user) => {
          this.authState = user
        }).catch(error => console.log(error));
     }
     
}