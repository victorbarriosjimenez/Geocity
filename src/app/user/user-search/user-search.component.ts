import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/index';
import { FormsService, RankingService, UserService } from '../../shared/index';
import { filter } from 'lodash';
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  public countries: any;
  public username: string = '';
  public country: string = '';
  public users: any[] = [];
  constructor(private formsService: FormsService,
              private userService : UserService,
              private rankingService: RankingService) { }
  ngOnInit() { 
    this.getListOfCountries();
  }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public filterByTextControl(): void {
    let userquery = this.username;
    let countryquery = this.country;
    this.users = userquery === '' ? [] : this.users;
      if(this.users) {
        this.users = [];
        this.rankingService.getListOfAllUsers()
            .subscribe(users => { 
                if(countryquery){
                    this.users = filter(users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1),{ country : countryquery }); 
                }
                else if(!countryquery && userquery){
                    this.users =  users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1);
                }
        }); 
    }
  }
  public filterByCountryControl(): void {
    let userquery = this.username;
    let countryquery = this.country;
    if(this.users){
       this.users= [];
       if(userquery){
        this.rankingService.getListOfAllUsers()
        .subscribe(users => { 
             this.users = filter(users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1),{ country : countryquery }); 
        });
       }
    }
  }
}