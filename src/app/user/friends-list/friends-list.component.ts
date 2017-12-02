import { Component, OnInit } from '@angular/core';
import { FormsService, RankingService, UserService } from '../../shared/index';
import { User } from '../../../models/index';
import  { filter, keys, size } from 'lodash';
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
  public friends: User[] = [];x
  public followerCount: number;
  
  ngOnInit() {
    this.getInitialListOfFriends();
    this.getListOfCountries();
  }
  constructor(private formsService: FormsService,
              private rankingService: RankingService,
              private _userService:  UserService) { }
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
  public setFriendKey(followers){
    keys(followers).map(key => this._userService.getFriendData(key)
                   .subscribe(friend => this.friends.push(friend), 
                             (err) => console.log(err),
                             () => console.log("Succes")));
  }
  private getNumberOfFriends(){
    this._userService.getFollowingList(this._userService.currentUserId)
    .subscribe(followers => {
      this.setFriendKey(followers);
      this.followerCount = this.countFollowers(followers);
    });
  }
  private countFollowers(followers) {
    if (followers.$value===null) return 0
    else return size(followers)
  }
}