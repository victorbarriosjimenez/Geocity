import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import  { User, Post } from '../../models';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostsService } from './../shared/posts.service'
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public createPostForm: FormGroup;
  user: User;
  post: string = '';
  constructor(private _postsService:PostsService,
              private _userService: UserService,
              private _afDatabase: AngularFireDatabase,
              private _fb: FormBuilder) {
               }
  ngOnInit() {
    this.getProfileBioData();
    this.createForm();
  }   
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success')
      );
  }
  public createNewPost(post: string): void { 
        console.log(this.createPostForm.value['body']);
  }
  public preparePost() { 
      const formModel = this.createPostForm.value;
      const postModel: Post = { 
          body: formModel.body as string, 
          timestamp: new Date(),
            
      }

  }
  public getListOfPostsFromUser( ): void {  }
  public createForm( ): void {
    this.createPostForm =  this._fb.group({
             body:['']
     });
   }
}