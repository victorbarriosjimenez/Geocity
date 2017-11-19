import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GameplayComponent } from '../gameplay/gameplay.component';


@Injectable()
export class MatchFinishedGuard implements CanDeactivate<GameplayComponent> {
    canDeactivate(
        component: GameplayComponent
    ): Observable<boolean>|Promise<boolean>|boolean {
        component.canDeactivateRouteOfGame.
    }
}