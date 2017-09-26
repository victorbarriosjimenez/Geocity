import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  paises:any;
  constructor(private _formsService: FormsService) { }

  ngOnInit() {
    this.getCountries();
  } 
  getCountries( ){ 
    this._formsService.getCountries()
        .subscribe(paises => this.paises = paises);
  } 

}