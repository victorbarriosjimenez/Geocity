import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService } from '../../shared/index';
import { User } from '../../../models/index';
import  { filter } from 'lodash';
@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  public countries: any;
  public rankedUsers: any[] = [];
  public username: string = '';
  public country: string = '';
  ngOnInit() {
    this.getInitialListOfFriends();
    this.getListOfCountries();
  }
  constructor(private formsService: FormsService,
              private rankingService: RankingService) { }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public filterByTextControl(): void{
    let userquery = this.username;
    let countryquery = this.country;
    this.rankedUsers = userquery === '' ? [] : this.rankedUsers;
      if(this.rankedUsers) {
        this.rankedUsers= [];
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
  public filterByCountryControl(): void {
    let userquery = this.username;
    let countryquery = this.country;
    if(this.rankedUsers){
       this.rankedUsers= [];
       if(userquery){
        this.rankingService.getListOfAllUsers()
        .subscribe(users => { 
             this.rankedUsers = filter(users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1),{ country : countryquery }); 
        });
       }
    }
  }
  public getInitialListOfFriends(){
    this.rankingService.getListOfAllUsers()
        .subscribe(users => this.rankedUsers = users);
  }

}