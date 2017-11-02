import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import  { User } from '../../models';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostsService } from './../shared/posts.service'
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  user: User;
  constructor(private _postsService:PostsService,
              private _userService: UserService,
              private _afDatabase: AngularFireDatabase) {
                
               }
  ngOnInit() {
    this.getProfileBioData();
  }   
  private getProfileBioData( ):  void {
    this._userService.getUserData()
      .subscribe(data => this.user = data,
                  (err) => console.log(err),
                  () => console.log('Success')
      );
  }
  public createNewPost( ): void { 

  }
  public getListOfPostsFromUser( ): void { 

  }

}