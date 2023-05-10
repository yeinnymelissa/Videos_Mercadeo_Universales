import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';

@Component({
  selector: 'app-contacto-page',
  templateUrl: './contacto-page.component.html',
  styleUrls: ['./contacto-page.component.scss']
})
export class ContactoPageComponent {
  contacto:any[];
  telefono:String = "";
  whatsapp:String = "";
  correo:String = "";
  opcion:number = 0;

  constructor(private servicio:GenericApiService){
    this.contacto = []
  }
  
  ngOnInit(){
    this.buscarContacto()
  }

  buscarContacto(){
    this.servicio.getUrl("/videos-api/contacto/datos").subscribe(
    (res: any) => this.llenarContacto(res)
    )
    
  }

  llenarContacto(res:any){
    this.contacto = [res]
    this.telefono = res.telefono
    this.whatsapp = res.whatsapp
    this.correo = res.correo
  }

}
