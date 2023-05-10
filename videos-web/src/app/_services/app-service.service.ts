import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private urlSegurity: string[] = [];
  private stateUrlSec: Subject<boolean> = new Subject<boolean>();
  private routeState;
  
  private user;
  private subjectLoading: Subject<boolean> = new Subject<boolean>();


  constructor(
  ) { }

  setUrlSecurity(urlRoute: string []) {
    this.urlSegurity = urlRoute;
  }

  getUrlSecurity() {
    return this.urlSegurity;
  }

  setStateUrlSec(loading: boolean): void {
    this.stateUrlSec.next(loading);
  }

  getStateUrlSec(): Observable<boolean> {
    return this.stateUrlSec.asObservable();
  } 

  setRouteState(p){
    this.routeState = p;
  }

  getRouteState(){
    return this.routeState;
  }

 
  setUser(value){
    this.user = value;
  }

  getUser(){
    return this.user;
  }
}
