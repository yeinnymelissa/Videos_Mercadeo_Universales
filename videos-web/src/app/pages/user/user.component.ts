import { Component, OnInit } from '@angular/core';
import { AppSecurityApiService } from 'src/app/_services/app-security-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  otherData: any;
  workGroup: any;
  chiefData: any;
  constructor( private appService: AppSecurityApiService) { }

  ngOnInit(): void {
    this.usr();
  }

  usr(){
    this.appService.getUserInfo()
    .subscribe(res =>{
        this.user = res.data[0];
        this.appService.getUserData(res.data[0].codContacto)
          .subscribe(data => {
            this.otherData = data.recordset[0];
            this.appService.getUserData(this.otherData.CHIEF[0].COD_CONTACTO)
          .subscribe(dataW => {
            this.workGroup = dataW.recordset[0].WORKERS;
            this.chiefData = dataW.recordset[0];
        });
        });
    })
}
}
