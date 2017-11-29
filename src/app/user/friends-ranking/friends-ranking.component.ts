import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService } from '../../shared/index';
import { FormGroup, FormBuilder } from '@angular/forms/';
@Component({
  selector: 'app-friends-ranking',
  templateUrl: './friends-ranking.component.html',
  styleUrls: ['./friends-ranking.component.css']
})
export class FriendsRankingComponent implements OnInit {
  public countries: any;
  public users: any = [];
  public searchFriendForm : FormGroup
  public username = ''
  public country = ''
  constructor(private formsService: FormsService,
              private rankingService: RankingService,
              private _fb: FormBuilder) { }
  ngOnInit() {
    this.getListOfCountries();
  }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public filterUsers(){
    this.rankingService.getListOfUsersByContryAndUsername()
        .subscribe(users => this.users = users);
  }
}