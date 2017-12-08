import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/index';
import { FormsService, RankingService } from '../../shared/index';
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
  public friends : any[] = [];
  constructor(private formsService: FormsService,
              private rankingService: RankingService) { }
  ngOnInit() { }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public filterByTextControl(): void {
    let userquery = this.username;
    let countryquery = this.country;
    this.friends = userquery === '' ? [] : this.friends;
      if(this.friends) {
        this.friends = [];
        this.rankingService.getListOfAllUsers()
            .subscribe(users => { 
                if(countryquery){
                    this.friends = filter(users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1),{ country : countryquery }); 
                }
                else if(!countryquery && userquery){
                    this.friends =  users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1);
                }
        }); 
    }
  }
  public filterByCountryControl(): void {
    let userquery = this.username;
    let countryquery = this.country;
    if(this.friends){
       this.friends= [];
       if(userquery){
        this.rankingService.getListOfAllUsers()
        .subscribe(users => { 
             this.friends = filter(users.filter((user: User) => user.username.toLowerCase().indexOf(userquery) !== -1),{ country : countryquery }); 
        });
       }
    }
  }
}