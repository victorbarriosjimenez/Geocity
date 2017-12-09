import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class AuthenticationService {
    public authState: any = null;
    public loginFormErrorsCode: any;
    public usernamesDatabaseReference: AngularFireList<any>;
    public signupFormErrorsCode: any;
    private _firebaseAuthentication = firebase.auth();
    public user: Observable<User>;
    constructor(private  afAuth: AngularFireAuth,
                private _snackBar: MatSnackBar,
                private _afDatabase: AngularFireDatabase, 
                private _router: Router,
                private _userService: UserService) 
                {           
                  this.afAuth.authState.subscribe((auth) => {
                    this.authState = auth
                }); 
               this.usernamesDatabaseReference =  this._afDatabase.list('/usernames');
    }  
    /* -------------------------------- Email Authentication Functions -------------------------------------- */ 
   public emailSignUp(userForm) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userForm.email,userForm.password)
          .then((user)=> 
                { 
                    this.authState = user,
                    this._firebaseAuthentication.currentUser.sendEmailVerification({ url : 'https://geocity-app.firebaseapp.com/__/auth/action'}),
                    this._userService.createsUserAndInitialData(user,userForm.country,userForm.username),
                    this._router.navigate(['/profile']);
                    setTimeout(this.checkIfEmailIsVerified(),3000);
                }).catch((error) => {
                     this.signupFormErrorsCode = error.code;
                     switch(this.signupFormErrorsCode){
                         case 'auth/email-already-in-use':
                                this.showSnackBarForNotifications('Este correo electrónico ya ha sido registrado.');
                                break;
                         case 'auth/invalid-email':
                                this.showSnackBarForNotifications('Este correo electrónico no es válido, intenta con otro.');
                                break;
                         case 'auth/weak-password':
                                this.showSnackBarForNotifications('La contraseña no es muy fuerte ¡Intenta con otra contraseña!');
                                break;
                         default: 
                                return;
                     }
                });
    }
    public checkIfEmailIsVerified(){
       let userSession = this._firebaseAuthentication.currentUser;
       let invitationToVerifyEmail = `Verifica tu correo a: ${this.currentUserEmail}!`;
       if(userSession != null){ 
           if(!userSession.emailVerified){
                this.showSnackBarForNotifications(invitationToVerifyEmail);
           }
           else { 
               return;
           }
       }
    }
    public showSnackBarForNotifications(message: string){ 
        this._snackBar.open(message, "OK", {
            duration: 6000,
        });
    }
    public emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
                    .then((user) => {
                         this.authState = user,      
                         this._router.navigate(['/profile']);
                         setTimeout(this.checkIfEmailIsVerified(),3000);
                    }).catch(
                        (error) =>{
                            this.loginFormErrorsCode =  error.code;
                            switch(this.loginFormErrorsCode){
                                case 'auth/wrong-password':
                                     this.showSnackBarForNotifications('Contraseña Incorrecta, vuelve a intentarlo.');
                                     break;
                                case 'auth/user-not-found':
                                     this.showSnackBarForNotifications('El usuario con este email no ha sido encontrado.');
                                     break;
                                default: 
                                    return;
                            }
                        } 
                    );
    }
    public logoutfromGeocity(): void { 
        this.afAuth.auth.signOut().then(
            () => { 
                this._userService.userEditionControl(null,true),
                this._router.navigate(['/'])
        });
    } 
    public getUsernames() { 
        return this.usernamesDatabaseReference.snapshotChanges().map(arr => {
            return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
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