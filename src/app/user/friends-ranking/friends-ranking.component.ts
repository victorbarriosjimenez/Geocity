import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../shared/index';
import { FormGroup } from '@angular/forms/';
@Component({
  selector: 'app-friends-ranking',
  templateUrl: './friends-ranking.component.html',
  styleUrls: ['./friends-ranking.component.css']
})
export class FriendsRankingComponent implements OnInit {
  public countries: any;
  public searchFriendForm : FormGroup
  constructor(private formsService: FormsService) { }
  ngOnInit() {
    this.getListOfCountries();
  }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public createForm( ): void {
    this.searchFriendForm =  this._fb.group({
             usernameFormControl:[''],
             countryFormControl:[''],
     });
   }
}