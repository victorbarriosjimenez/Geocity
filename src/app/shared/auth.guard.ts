import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot, 
        Router
  } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authenticationService: AuthenticationService, private _router: Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authenticationService.authenticated) { return true; }
      return this._authenticationService.currentUserObservable
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
               console.log("access denied")
               this._router.navigate(['/login']);
             }
         })
  }
}
