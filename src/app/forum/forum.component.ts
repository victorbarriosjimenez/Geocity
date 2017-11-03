import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import  { User, Post } from '../../models';
import { AngularFireDatabase } from 'angularfire2/database';
import { ForumService } from './../shared/forum.service'
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public createPostForm: FormGroup;
  public user: User;
  public posts: Post[];
  constructor(private _forumService:ForumService,
              private _userService: UserService,
              private _afDatabase: AngularFireDatabase,
              private _fb: FormBuilder) {
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
  }
  public preparePost() { 
      const formModel = this.createPostForm.value;
      const postModel: Post = { 
          body: formModel.body as string, 
          timestamp: new Date() as Date,
          authorProfilePhoto: this.user.profilePhotoUrl as string,
          authorUsername: this.user.username as string,
          userId: this._userService.currentUserId as string
      }
      return postModel;
  }
  public getListOfAllPosts( ): void { 
      this._forumService.getListOfAllPosts()
          .subscribe((posts: Post[]) => { 
                  this.posts = posts
          });
  }
  public createForm( ): void {
    this.createPostForm =  this._fb.group({
             body:['']
     });
   }
}