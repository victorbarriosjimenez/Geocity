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
  public countryFilter: string = '';
  public users: any[] = [];
  constructor(private formsService: FormsService,
              private userService : UserService,
              private rankingService: RankingService) { }
  ngOnInit() { 
    this.getListOfCountries();
    this.getInitialListOfAllUsers();
  }
  public getListOfCountries(){
    this.formsService.getCountries()
        .subscribe(countries => this.countries = countries);
  }
  public getInitialListOfAllUsers(): void {
      this.rankingService.getListOfAllUsers()
          .subscribe(users => this.users = users);
  }
  public filterByCountryControl(): void {
    let countryquery = this.countryFilter;
    console.log(countryquery);
    if(countryquery === 'all'){
      this.getInitialListOfAllUsers(); 
    }
    else {
      this.rankingService.getListOfAllUsers()
          .subscribe(users => { 
              this.users = filter(users, { country : countryquery }); 
      });
    }
  }
}