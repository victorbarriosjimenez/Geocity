import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService } from '../../shared/index';
import { FormGroup, FormBuilder } from '@angular/forms/';
import { User } from '../../../models/index';
@Component({
  selector: 'app-friends-ranking',
  templateUrl: './friends-ranking.component.html',
  styleUrls: ['./friends-ranking.component.css']
})
export class FriendsRankingComponent implements OnInit {
  public countries: any;
  public users: User[] = [];
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
    let userquery = this.username;
    this.rankingService.getListOfAllUsers()
        .subscribe(users =>{ 
             this.users = users.filter((user: User) => user.username.toLocaleLowerCase().indexOf(userquery) !==  -1) 
        });
  }
}