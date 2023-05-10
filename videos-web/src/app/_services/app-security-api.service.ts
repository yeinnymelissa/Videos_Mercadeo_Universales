import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppServiceService } from './app-service.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppSecurityApiService {

  constructor(
    private http: HttpClient,
    private appService: AppServiceService,
  ) { }


  getMenuTemplateService(): Observable<any> {
    //PRODUCCIÓN
    //return this.http.get<any>(`${'/security/user/me/service/'}${environment.serviceId}${'/resources/type/3'}`);
    return of({
      "result": "OK",
      "msg": "Solicitud procesada con exito",
      "data": [
        {
          "name": "Videos",
          "description": "Videos",
          "route": "videos",
          "icon": null,
          "keyValue": null,
          "status": null,
          "childs": [],
          "parent": null,
          "service": null,
          "root": true
        },
        {
          "name": "Agrupadores",
          "description": "Agrupadores",
          "route": "agrupadores",
          "icon": null,
          "keyValue": null,
          "status": null,
          "childs": [],
          "parent": null,
          "service": null,
          "root": true
        },
        {
          "name": "Contacto",
          "description": "Contacto",
          "route": "contacto",
          "icon": null,
          "keyValue": null,
          "status": null,
          "childs": [],
          "parent": null,
          "service": null,
          "root": true
        },
        {
          "name": "Contactanos",
          "description": "Contactanos",
          "route": "contactanos",
          "icon": null,
          "keyValue": null,
          "status": null,
          "childs": [],
          "parent": null,
          "service": null,
          "root": true
        }
      ]
    })
    
  }

  getUserInfo(): Observable<any> {
    //PRODUCCIÓN
    //return this.http.get<any>(`${'/security/user/me'}`);
    return of({"result":"OK","msg":"Solicitud procesada con exito","data":[{"id":60850,"usuario":"CADAVILA","apellidos":"DAVILA","email":"cdavila@universales.com","codContacto":1576845,"situacion":1,"cveage":1,"oficina":"01","fechaExpira":"2024-02-23T06:00:00.000+00:00","foto":null,"roles":"","locked":false,"nombre":"CARLOS"}]});
  }

  getUserData(codContacto): Observable<any> {
    return this.http.get<any>(`${'/api-planner/planner/getUserInfo/'}${codContacto}`);
  }


  getReport(report:any): Observable<any> {
    return this.http.post<any>(`${'/security/tools/birtEncoder'}`,report);
  }

  messageAlert(msj, type, title , msgSrv:MessageService,lifeTime?:number){
    let showTime:any = 0;
    let severityTxt ='';
    if (lifeTime === null){
      showTime = 2500;
    }else{
      showTime = lifeTime;
    }
    if(type ===0){
      severityTxt = 'success';
    }else if (type ===1){
      severityTxt = 'warn';
    }else {
      severityTxt = 'error'
    }
    msgSrv.add({severity: severityTxt, summary: title, detail: msj, sticky: false, closable: true, life: showTime});

  }


}
