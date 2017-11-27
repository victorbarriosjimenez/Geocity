import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { mapValues, groupBy, get } from 'lodash';
import { Post, Comment } from '../../models';
@Injectable()
export class ForumService {
    private userId: string;
    private dataPath: string = '/posts';
    private postsDatabaseReference: AngularFireList<Post>;
    private commentsDatabaseReference: AngularFireList<Comment>;
    private postDatabaseReference:  AngularFireObject<Post>;
    private listOfPosts: Observable<Post[]>; 
    private post:  Observable<Post>;  
    public emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
    constructor(private _afDatabase: AngularFireDatabase,
                private _afAuth: AngularFireAuth) {
                    this.postsDatabaseReference = _afDatabase.list('/posts');
                    this.commentsDatabaseReference =  _afDatabase.list('/comments');                
    }
    /* ---------------------------------- POSTS MANAGEMENT ----------------------------------  */
    public getListOfAllPosts(query?: any) {
        return this.postsDatabaseReference.snapshotChanges().map(arr => {
            return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
          })
    }
    public getPost(key: string): Observable<Post> { 
        const itemPath = `${this.dataPath}/${key}`;
        this.post = this._afDatabase.object(itemPath).valueChanges();
        return this.post;
    }
    public createNewPost(post: Post): void {
        this.postsDatabaseReference.push(post);
    }
    public deletePost(key: string): void { 
        const itemPath =  `${this.dataPath}/${key}`;
        const postRef: AngularFireObject<any> = this._afDatabase.object(itemPath);         
        postRef.remove();
    }
    /* ---------------------------------- COMMENTS MANAGEMENT ----------------------------  ------  */
    public deleteComment(key: string): void { 
        const itemPath =  `/comments/${key}`;
        const postRef: AngularFireObject<any> = this._afDatabase.object(itemPath);         
        postRef.remove();
    }
    public createNewComment(comment: Comment) { 
        this.commentsDatabaseReference.push(comment);
    }
    public getAllComments() {
        return this.commentsDatabaseReference.snapshotChanges().map(arr => {
            return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
          })
    }
    public getCommentsFromPostSelected(postId: string){
        return this.getAllComments()
                   .map((comments: Comment[]) => comments.filter((comment: Comment) => comment.postId === postId));
    }
    /* ---------------------------------- REACTIONS MANAGEMENT ----------------------------------  */
    public getReactions(itemId): AngularFireObject<any> {
        return this._afDatabase.object(`reactions/${itemId}`)
    }
    public updateReaction(itemId, reaction=0): void {
        const data = { [this.userId]: reaction }
        this._afDatabase.object(`reactions/${itemId}`).update(data)
    }
    public removeReaction(postId: string,userId: string ): void  {
        this._afDatabase.object(`reactions/${postId}/${userId}`).remove()
    }
    public countReactions(reactions: Array<any>) {
        return mapValues(groupBy(reactions), 'length')
    }
    public userReaction(reactions: Array<any>) {
        return get(reactions, this.userId)
    }
}                                          