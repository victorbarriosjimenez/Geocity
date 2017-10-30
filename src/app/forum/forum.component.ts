import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  constructor(private _userService: UserService) { }
  ngOnInit() {
    
  }
}