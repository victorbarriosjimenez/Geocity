import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/authentication.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private auth: AuthenticationService) { }
  ngOnInit() { }
  public logoutFromGeocity(): void {
    this.auth.logoutfromGeocity();
  } 
} 