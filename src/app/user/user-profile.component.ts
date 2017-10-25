import { Component, OnInit } from '@angular/core';
import  { AuthenticationService } from '../shared/authentication.service';
import { Router }  from '@angular/router';
import  { User } from '../../models'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private auth: AuthenticationService,
              private _router: Router) { }
  ngOnInit() { 
  
   }
  public updateProfile(){

  }
}