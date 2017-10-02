import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthenticationService {
constructor(private _af: AngularFireAuth) { }
public loginUser( email: string, password: string): Observable<any> { 
    return 
    }
}