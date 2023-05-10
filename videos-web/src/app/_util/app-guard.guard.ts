import { AppServiceService } from '../_services/app-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private appService: AppServiceService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.nextUrlSecurity(state.url);
  }

  nextUrlSecurity(route: string): boolean {
    const urlSecurity:any[] = this.appService.getUrlSecurity();
    let existMenu = false;

    if(urlSecurity){
      urlSecurity.forEach(url => {
        if (route.includes(url.route)) {
          existMenu = true;
        }
      });
    }else{
      this.appService.setRouteState(route);
      this.appService.getStateUrlSec().subscribe((status: boolean) => {
        setTimeout(() => this.navigateUrlState(), 0)
      });
    }
    return existMenu;
  }

  navigateUrlState(){
    this.router.navigate([this.appService.getRouteState()]);
  }
}
