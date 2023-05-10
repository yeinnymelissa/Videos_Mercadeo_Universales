import { Component, OnInit } from '@angular/core';
import { AppSecurityApiService } from '../../_services/app-security-api.service';
import { AppServiceService } from '../../_services/app-service.service';
import { GenericApiService } from 'src/app/_services/generic-api.service';

declare var jQuery: any;
@Component({

  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  menus: any = [];
  usuario: any;
  userGeral:any;

  constructor(
    private appService: AppServiceService,
    private appSecurityApiService: AppSecurityApiService,
    private genericService: GenericApiService
  ) { }


  ngOnInit() {
    this.getMenuTemplate();
    this.getInfoUser();
  }

  getMenuTemplate() {
    this.appSecurityApiService.getMenuTemplateService()
      .subscribe(
        (res: any) => this.succesGetMenu(res)
      );
  }


  agrupadoresMenu(res: any){
    if (res) {
      res.forEach(element => {
        this.menus.push(element)
      });
    }
  }

  succesGetMenu(res: any) {
    this.genericService.getUrl("/videos-api/agrupadorvideo/obtenerEstado").subscribe(
      (resAux: any) => {
        resAux.forEach(element => {
          res.data.push(element)
        });
      
        if (res.data) {
          this.menus = res.data;
          this.pushUrlSecurity(res.data)
        }
      }
    );
  }

  pushUrlSecurity(menu: any[]) {
    let urlSegurity:any = [];
    menu.forEach(item => {
      let route = { route: item.route, name: item.name, desc: item.description}
      urlSegurity.push(route);
      item.childs.forEach(subItem => {
        let routeChild = { route: subItem.route, name: subItem.name, desc: subItem.description}
        urlSegurity.push(routeChild);
      });
    });
    this.appService.setUrlSecurity(urlSegurity);
    this.appService.setStateUrlSec(true);
  }

  isSubMenu(auxObject: any[]): boolean {
    if (auxObject && auxObject.length > 0) {
      return true;
    }
    return false;
  }

  getInfoUser() {
    this.appSecurityApiService.getUserInfo()
      .subscribe(
        (res: any) => this.succesGetUserInfo(res)
        
      );
  }

  succesGetUserInfo(res: any) {
    if (res.data[0]) {
      this.usuario = res.data[0];
      this.appService.setUser(res.data[0]);
    }
  }


  activateClass(subModule, all) {
    all.forEach(element => {
      if (element != subModule) {
        element.active = false;
        if (element.childs) {
          element.childs.forEach(child => {
            if (child != subModule) {
              child.active = false;
            }
          });
        }
      }
    });
    subModule.active = !subModule.active;
  }
}
