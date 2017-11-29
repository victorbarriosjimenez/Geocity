import { Injectable } from '@angular/core';
import { User } from '../../models';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { take } from 'lodash';
@Injectable()
export class RankingService {
    private usersDatabaseReference: AngularFireList<User>;    
    constructor(private _afDatabase: AngularFireDatabase) { 
        this.usersDatabaseReference = _afDatabase.list('users')
    }
    public getListOfAllUsers(){ 
        return this.usersDatabaseReference.snapshotChanges().map(arr => {
            return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
          })
    }
}