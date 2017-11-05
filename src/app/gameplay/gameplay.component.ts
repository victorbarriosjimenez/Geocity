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
  public lat: number = 52.5429145;
  public lng: number = 4.4419949;
  constructor(private _gameplayService: GameplayService) { 
    this.beginMatch = null;
    this.locations = [ ];
  }
  ngOnInit() { 
    this.isMatchConfigurationDone = false;
  }
  private selectContinentForMatch(continent: Continent): void { 
    continent.isContinentSelected = true;
    this._gameplayService.getMatchLocations(continent.apiEndpoint)
        .subscribe(locations => this.locations = locations,
                  (err) => console.log(err),
                  () => { 
                      this.isLoadingLocationsFromContinentSelected = false
                       continent.isContinentSelected = false
                  });
  }
  beginMatchAndServeLocations() {
    this.isMatchConfigurationDone = true;
  }
}