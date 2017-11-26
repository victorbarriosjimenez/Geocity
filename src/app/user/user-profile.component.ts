import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router }  from '@angular/router';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { User , Match, Post } from '../../models'
import { UserService, ForumService, RankingService } from './../shared/';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase/app';
import { take , orderBy } from 'lodash';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public podiumUsers: User[];
  public createPostForm: FormGroup; 
  public comment:  string = '';
  public matches: any;
  public posts: Post[];
  public post: Post;
  constructor(private auth: AuthenticationService,
               private _forumService:ForumService,
              private _userService:  UserService,
              private _rankingService: RankingService,
              private _fb: FormBuilder,
              private _router: Router,
              private _snackBar: MatSnackBar) { 
              }
  ngOnInit() { 
    this.getProfileBioData();
    this.getUserMatches();
    this.getListOfAllPosts();
    this.createForm();
    this.getWorldRankingPodium();
  }
  public createNewPost( ): void { 
    const postModel: Post = this.preparePost();
    this._forumService.createNewPost(postModel);
    this.createPostForm.reset();
    this.showsSnackOfPostCreated(`Hey ${this.user.username}! tu publicación ha sido publicada`);
  }
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success'));
  }
  public getUserMatches(): void {
    this._userService.getUserMatches()
                     .subscribe(matches  => this.matches = matches);
  }
  public createNewMatch( ): void {
      this._router.navigate(['/gameplay']);
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
                this.posts = posts.reverse();
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
    public addComment( ): void { 
        
    }
}