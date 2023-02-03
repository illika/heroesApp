import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAuth()
      .pipe(
        tap((estado) => {
          if (!estado) {
            this.router.navigate(["./auth/login"]);
          }
        })
      );
    /*
    if ((this.authService.user.id)) {
      return true;
    }
    console.log("Bloqueado por AuthGuard - CanActivate");
    return false;
    */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAuth()
      .pipe(
        tap((estado) => {
          if (!estado) {
            this.router.navigate(["./auth/login"]);
          }
        })
      );
    /*
    if ((this.authService.user.id)) {
      return true;
    }
    console.log("Bloqueado por AuthGuard - CanLoad");
    return false;
    */
  }
}
