import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router }  from '@angular/router';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { User , Match, Post, Comment } from '../../models'
import { UserService, ForumService, RankingService } from './../shared/';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase/app';
import { take , orderBy, get, size, keys } from 'lodash';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public podiumUsers: User[];
  public createPostForm: FormGroup; 
  public matches: any;
  public friends: User[];
  followerCount;
  public posts: Post[];
  public postSelected: Post;
  constructor(private auth: AuthenticationService, 
              private _forumService:ForumService,
              private _userService:  UserService,
              private _rankingService: RankingService,
              private _fb: FormBuilder,
              private _router: Router,
              private _snackBar: MatSnackBar) { 
              this.postSelected = { };
              this.friends = [];
              }
  ngOnInit() { 
    this.getProfileBioData();
    this.getUserMatches();
    this.getListOfAllPosts();
    this.createForm();
    this.getWorldRankingPodium();
    this.getNumberOfFriends();
  }
  private getNumberOfFriends(){
    this._userService.getFollowingList(this._userService.currentUserId)
    .subscribe(followers => {
      this.setFriendKey(followers);
      this.followerCount = this.countFollowers(followers);
    });
  }
  private countFollowers(followers) {
    if (followers.$value===null) return 0
    else return size(followers)
  }
  public setFriendKey(followers){
     keys(followers).map(key => this._userService.getFriendData(key)
                    .subscribe(friend => this.friends.push(friend), 
                              (err) => console.log(err),
                              () => console.log("Succes")));
  }
  public createNewPost( ): void { 
    if(this.createPostForm.value.body === ''){
        this.showsSnackOfPostCreated('La publicación está vacía.');
      return;
    }
    else {
      const postModel: Post = this.preparePost();
      this._forumService.createNewPost(postModel);
      this.createPostForm.reset();
      this.showsSnackOfPostCreated(`Hey ${this.user.username}! tu publicación ha sido publicada`);
     } 
  }
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => {
        this.user = data;
      },
                  (err) => console.log(err),
                  () => console.log('Success'));
  }
  public getUserMatches(): void {
    this._userService.getUserMatches()
                     .subscribe(matches  => this.matches =  take(matches.reverse(),5));
  }
  public createNewMatch( ): void {
      this._router.navigate(['/gameplay']);
   }
  public preparePost(): Post { 
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
          body:['']
     });
   }
   private showsSnackOfPostCreated(message: string) : void {
    this._snackBar.open(message, "OK", {
        duration: 2000,
      }); 
    }
    public getWorldRankingPodium(): void  {
      this._rankingService.getListOfAllUsers()
          .subscribe(users => {  this.filterUsersAsPodium(users); },  
          ()=>{ this.showsSnackOfPostCreated('Ocurrio un error'); }
        )
    }
    public filterUsersAsPodium(users: User[]): void {
        if(users){
           this.podiumUsers = orderBy(take(users,3),['score'],['desc']); 
        }
        else { 
          return;
        }
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
        this.postSelected.showForm = !this.postSelected.showForm;
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