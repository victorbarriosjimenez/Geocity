import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class UserService {
    private firebaseUrl: string = 'https://geocity-app.firebaseio.com/';
    public authState: any = null;    
    constructor(private http: Http,
                private _afDatabase: AngularFireDatabase,
                private _afAuth: AngularFireAuth) { 
                this._afAuth.authState.subscribe((auth) => {
                    this.authState = auth
                }); 
    }
    public createsUserAndInitialData(){ 
        const path = `users/${this.currentUserId}`; 
        const userRef: AngularFireObject<any> = this._afDatabase.object(path);
        const data = {
          email: this.authState.email,
          name: 'Victor'
        }
        userRef.update(data)
          .catch(error => console.log(error));
    }
    public getUserData() { 
        const userDataPath = `https://geocity-app.firebaseio.com/users/${this.currentUserId}.json`;
        return this.http.get(userDataPath)
                  .map(response => response.json());
    }
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    get authenticated(): boolean {
        return this.authState !== null;
    }
}