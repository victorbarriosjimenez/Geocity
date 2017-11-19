import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../shared/forms.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) { }
  ngOnInit() {}
  public loginToGeocityAccount(){
    this._router.navigate(['/login']);
  }
  public signUpToGeocityAccount(){
    this._router.navigate(['/register']);    
  }
}