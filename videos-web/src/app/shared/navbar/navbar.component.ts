import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { appRoutes } from '../../_util/app-routing.module';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { AppServiceService } from 'src/app/_services/app-service.service';
import {ConfirmationService} from 'primeng/api';

@Component({
    
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
})

export class NavbarComponent implements OnInit{
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    flag  = true;
  
    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(location:Location, 
                private element : ElementRef, 
                private router: Router,
                private appService: AppServiceService,
                private confirmationService: ConfirmationService
                ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.sidebarVisible = true;
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
    getTitle(){
      var path  = this.location.path().substring(1,this.location.path().length);
      let urlsAuth:any[] = this.appService.getUrlSecurity();
      
      
      let titlee =  '';

      if(urlsAuth){
        urlsAuth.forEach(url => {
          if (path.includes(url.route)) {
             titlee = url.name;
          }
        });
      }
      return titlee;
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

     logout(event){
      console.log("holis");
      this.confirmationService.confirm({
        target: event.target,
        message: '¿ Está seguro que desea salir ?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            window.location.href = '/logout';
        },
        reject: () => {
            //reject action
        }
    });
     }
}
