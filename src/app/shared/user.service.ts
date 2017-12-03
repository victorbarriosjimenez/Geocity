import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User , Match } from '../../models';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
@Injectable()
export class UserService {
    private firebaseUrl: string = 'https://geocity-app.firebaseio.com/';
    private matchesDatabaseReference : AngularFireList<Match>;
    private matchesFilteredDatabaseReference : AngularFireList<Match>;    
    public authState: any = null;    
    public updateProfileRequests: number = 0;
    constructor(private http: Http,
                private _afDatabase: AngularFireDatabase,
                private _afAuth: AngularFireAuth,
                private _router: Router) { 
                 this._afAuth.authState.subscribe((auth) => {
                        this.authState = auth
                 });
                 this.matchesDatabaseReference = _afDatabase.list('/matches');
    }
   /* ---------------------------------- USER CRUD OPERATIONS ----------------------------------  */
   public createsUserAndInitialData(userstate,country,username){ 
        const path = `users/${userstate.uid}`;
        const usernamesPath = `usernames/${userstate.uid}`;  
        const userRef: AngularFireObject<any> = this._afDatabase.object(path);
        const usernamesRef: AngularFireObject<any> = this._afDatabase.object(usernamesPath);                
        const data = {
            email: userstate.email,
            username: username,
            country: country,
            score: 0,
            editionRequests: 0,
            profilePhotoUrl: 'http://voice4thought.org/wp-content/uploads/2016/08/default2-1.jpg'
        }
        const usernameNewData  = {
            username: username 
        }
        userRef.update(data)
          .then(() => usernamesRef.update(usernameNewData))
          .catch(error => console.log(error))
    }
    public updateUserInformation(userUpdateFormModel: User) {
        const path = `users/${this.currentUserId}`; 
        const usernamesPath = `usernames/${this.currentUserId}`; 
        const usernamesReference:   AngularFireObject<any> = this._afDatabase.object(usernamesPath);    
        const userRef: AngularFireObject<any> = this._afDatabase.object(path);    
        const data = {
            username: userUpdateFormModel.username,
            country: userUpdateFormModel.country,
            profilePhotoUrl: userUpdateFormModel.profilePhotoUrl
        }       
        return userRef.update(data).then(() => {
                usernamesReference.update({ username : userUpdateFormModel.username });
        });
    }
    public getAllMatches( ) {
        return this.matchesDatabaseReference.snapshotChanges().map(arr => {
            return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
        });
    }
    public getUserMatches(){ 
       return this.getAllMatches()
                  .map((matches: Match[]) => matches.filter((match: Match) => match.userId === this.currentUserId));
    }
    public updateUserScoreAfterMatchFinished(currentUserScore: number, matchScore: number) {
         let newScoreFromUser = currentUserScore + matchScore;
         const path = `users/${this.currentUserId}`; 
         const userRef: AngularFireObject<any> = this._afDatabase.object(path); 
         const data: User =  { score: newScoreFromUser }; 
         userRef.update(data).then(
             () => this._router.navigate(['/profile']));
    }
    public getUserData()  { 
        const userDataPath = `https://geocity-app.firebaseio.com/users/${this.currentUserId}.json`;
        return this.http.get(userDataPath)
                  .map(response => response.json());
    }
    public getFriendData(friendKey: string)  { 
        const path = `users/${friendKey}`; 
        return this._afDatabase.object(path).snapshotChanges();
    }
    /* ---------------------------------- USER ACCOUNT OPERATIONS ----------------------------------  */
    public sendsResetPasswordEmail(email: string) {
        const fbAuth = firebase.auth();
        return fbAuth.sendPasswordResetEmail(email)
          .then(() => console.log('email sent'))
          .catch((error) => console.log(error))
    }
    public userEditionControl(edtions: number,reset?: boolean) { 
        this.updateProfileRequests = edtions; 
        const path = `users/${this.currentUserId}`; 
        const userRef: AngularFireObject<any> = this._afDatabase.object(path); 
        if(reset) {
            this.updateProfileRequests = 0;
            const data = { editionRequests: this.updateProfileRequests };
            userRef.update(data);
        }  
        else {
            this.updateProfileRequests += 1;  
            const data = {  editionRequests: this.updateProfileRequests }
            userRef.update(data);
        }
    }
    /* ---------------------------------- USER PROPERTIES  ----------------------------------  */
    public follow(followerId: string, followedId: string) {
        this._afDatabase.object(`following/${followerId}`).update({ [followedId]: true } );
        this._afDatabase.list(`messages/${followerId}`).push({ title : 'Hello World', body: 'qwqwewqe' });        
    }
    public unfollow(followerId: string, followedId: string) {
        this._afDatabase.object(`following/${followerId}/${followedId}`).remove();
    }
    public getFollowers(userId: string) {
        return this._afDatabase.object(`followers/${userId}`).valueChanges();
    }
    public getFollowingList(userId: string) {
        return this._afDatabase.object(`following/${userId}`).valueChanges();
    }
    public getFollowing(followerId:string, followedId:string) {
        return this._afDatabase.object(`following/${followerId}/${followedId}`).valueChanges();
    }   
    /* ---------------------------------- USER PROPERTIES  ----------------------------------  */
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    get authenticated(): boolean {
        return this.authState !== null;
    }
    /* ------------------------- Set Rankings for users ---------------*/
    public setFriendsRankingForToday(listOfRankedUsers: User[]){
       let listOfMatchesFound = []; 
       listOfRankedUsers.map(
            (user: User)=> {
                return this._afDatabase.list('/matches', ref => ref.orderByChild('userId').equalTo(user.$key)).snapshotChanges().map(arr => {
                    return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
                }).subscribe(matches => this.filterMatchesByDate(listOfMatchesFound)); 
            }
        );   
    }
    public filterMatchesByDate(matches: Match[]){
        let today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();        
        let t = `${dd}-${mm}-${yyyy}`;
        console.log(matches);
        //matches.filter(match => match.timestamp === t)
    }
}