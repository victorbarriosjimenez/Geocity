import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private auth: AuthenticationService, private _router: Router) { }
  ngOnInit() { }
  public navigate(routeSelected: string){
    let route = `/${routeSelected}`;
    this._router.navigate([route]);
  }
  public logoutFromGeocity(): void {
    this.auth.logoutfromGeocity();
  } 
} 