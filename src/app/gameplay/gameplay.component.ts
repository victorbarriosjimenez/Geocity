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
  public latitudeOfContinentSelected: number = 0;
  public longitudeOfContinentSelected: number = 0;
  constructor(private _gameplayService: GameplayService) { 
    this.beginMatch = null;
    this.locations = [ ];
  }
  ngOnInit() { 
    this.isMatchConfigurationDone = false;
  }
  private selectContinentForMatch(continent: Continent): void {
    this.latitudeOfContinentSelected = continent.lat;
    this.longitudeOfContinentSelected = continent.lng;
    continent.isContinentSelected = true;
    this._gameplayService.getMatchLocations(continent.apiEndpoint)
        .subscribe(locations => this.locations = locations,
                  (err) => console.log(err),
                  () => { 
                      this.isLoadingLocationsFromContinentSelected = false,
                      continent.isContinentSelected = false,
                      this.isMatchConfigurationDone = true
                  });
  }
}