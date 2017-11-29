import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService } from '../../shared/index';
import { FormGroup, FormBuilder } from '@angular/forms/';
import { User } from '../../../models/index';
import  { filter } from 'lodash';
@Component({
  selector: 'app-friends-ranking',
  templateUrl: './friends-ranking.component.html',
  styleUrls: ['./friends-ranking.component.css']
})
export class FriendsRankingComponent implements OnInit {
  public countries: any;
  public rankedUsers: any[] = [];
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
    if(this.rankedUsers){
       this.rankedUsers= [];
       let userquery = this.username;
       let countryquery = this.country;
       this.rankingService.getListOfAllUsers()
           .subscribe(users => { 
               if(countryquery){
                this.rankedUsers = filter(users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1),{ country : countryquery }); 
               }
               else if(!countryquery && userquery){
                this.rankedUsers =  users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1);
               }
           }); 
      }
    }
  

}