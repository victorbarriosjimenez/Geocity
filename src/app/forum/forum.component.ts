import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import  { User, Post, Comment } from '../../models';
import { AngularFireDatabase } from 'angularfire2/database';
import { ForumService } from './../shared/forum.service'
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public createPostForm: FormGroup;
  public user: User;
  public posts: Post[];
  public postSelected: Post;  
  public postsLoading: boolean = true;  
  constructor(private _forumService:ForumService,
              private _userService: UserService,
              private _afDatabase: AngularFireDatabase,
              private _fb: FormBuilder,
              private _snackBar: MatSnackBar) {
               
              }
  ngOnInit() {
    this.getProfileBioData();
    this.getListOfAllPosts();
    this.createForm();
  }   
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success')
      );
  }
  public createNewPost( ): void { 
      const postModel: Post = this.preparePost();
      this._forumService.createNewPost(postModel);
      this.createPostForm.reset();
      this.showsSnackOfPostCreated(`Hey ${this.user.username}! tu publicación ha sido publicada`);
  }
  public preparePost() { 
      const formModel = this.createPostForm.value;
      const postModel: Post = { 
          body: formModel.body as string, 
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          authorProfilePhoto: this.user.profilePhotoUrl as string,
          authorUsername: this.user.username as string,
          userId: this._userService.currentUserId as string
      }
      return postModel;
  }
  public getListOfAllPosts( ): void { 
      this._forumService.getListOfAllPosts()
          .subscribe((posts: Post[]) => { 
                  this.posts = posts.reverse()
      });
  }
  public createForm( ): void {
    this.createPostForm =  this._fb.group({ 
             body:['', Validators.required]
     });
   }
  private showsSnackOfPostCreated(message: string) : void {
      this._snackBar.open(message, "OK", {
          duration: 2000,
    });   
  }
  public addComment(comment: string): void { 
    const commentModel : Comment = {
        body: this.postSelected.commentText as string, 
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        authorProfilePhoto: this.user.profilePhotoUrl as string,
        authorUsername: this.user.username as string,
        userId: this._userService.currentUserId as string,
        postId: this.postSelected.$key as string
    }
    this._forumService.createNewComment(commentModel);
    this.postSelected.commentText = '';    
  }  
  public selectPost(post: Post): void { 
    this.postSelected = post;
    this.postSelected.showForm = true;
    this.postSelected.commentText = '';
    this._forumService.getCommentsFromPostSelected(this.postSelected.$key)
                      .subscribe(comments => this.postSelected.comments = comments,
                                 (err) => console.log(err),
                                 () => console.log("Success")
                      );
  } 
  public deletePost(key: string): void {
    this._forumService.deletePost(key);
    this.showsSnackOfPostCreated('Publicación eliminada');
} 
  public deleteComment(key: string): void {
    this._forumService.deleteComment(key);
    this.showsSnackOfPostCreated('Comentario eliminado');      
  } 
}