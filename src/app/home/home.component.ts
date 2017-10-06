import { Component, OnInit } from '@angular/core';
import { FormsService } from './../shared/forms.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paises: any;
  constructor(private _formsService: FormsService) { }

  ngOnInit() {
    this.getCountries();
  }
  private getCountries() { 
    this._formsService.getCountries()
        .subscribe(paises => this.paises = paises);
  } 
}