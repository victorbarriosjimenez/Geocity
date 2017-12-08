import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/index';
import { FormsService } from '../../shared/index';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  public countries: any;
  public rankedUsers : User[] = [];
  constructor(private formsService: FormsService) { }

  ngOnInit() {
  }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public filterByTextControl(): void {
    let userquery = this.username;
    let countryquery = this.country;
    this.friends = userquery === '' ? [] : this.rankedUsers;
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
}