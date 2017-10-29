import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class Item {
    body: string;
    userId: string;
  }
export class PostService {

    items: AngularFireList<Item[]> = null;
    userId: string;
    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => {
        if(user) this.userId = user.uid
      })
    }
    // Return an observable list with optional query
    // You will usually call this from OnInit in a component
    getItemsList(): AngularFireList<Item[]>{
      if (!this.userId) return;
      this.items = this.db.list(`items/${this.userId}`);
      return this.items
    }
  // Create a brand new item
  createItem(item)  {
    item.userId = this.userId
    this.items.push(item)
  }
}