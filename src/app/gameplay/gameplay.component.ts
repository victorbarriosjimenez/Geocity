import { Component, OnInit } from '@angular/core';
import { GameplayService, Continent, continents  } from './../shared';
import { Location} from '../../models';
@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  public beginMatch: boolean;
  public locations: any; 
  public continents =  continents;
  public lat: number;
  public lng: number;
  constructor(private _gameplayService: GameplayService) { 
    this.beginMatch = null;
    this.locations = [ ];
  }
  ngOnInit() { }
  selectContinentForMatch(continent: Continent): void { 
    this._gameplayService.getMatchLocations(continent.apiEndpoint)
        .subscribe((locations: any) => { this.locations = locations });
  }
}