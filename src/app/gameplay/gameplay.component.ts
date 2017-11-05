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
  public isMatchConfigurationDone: boolean;
  public isLoadingLocationsFromContinentSelected: boolean = true;
  lat: number;
  lng: number;
  constructor(private _gameplayService: GameplayService) { 
    this.beginMatch = null;
    this.locations = [ ];
  }
  ngOnInit() { 
    this.isMatchConfigurationDone = false;
  }
  selectContinentForMatch(continent: Continent): void { 
    continent.isContinentSelected = true;
    this._gameplayService.getMatchLocations(continent.apiEndpoint)
        .subscribe(locations => this.locations = locations,
                  (err) => console.log(err),
                  () => this.isLoadingLocationsFromContinentSelected = false);
  }
}