import { Injectable } from '@angular/core';
import { AngularFireAuth , FirebaseAuthStateObservable } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthenticationService {
constructor(private _af: AngularFireAuth) { }
    public loginUser( email: string, password: string) { 
        this._af.auth.signInWithEmailAndPassword(email,password);
    }
    public logoutUser():any { 
        this._af.auth.signOut();    
    }
}