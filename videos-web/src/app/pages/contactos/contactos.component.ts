import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent {
  contacto:any[];
  telefono:String = "";
  whatsapp:String = "";
  correo:String = "";
  opcion:number = 0;

  constructor(private servicio:GenericApiService, private messageService: MessageService){
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

  cancelarOperacion(){
    this.opcion = 0
  }

  actualizarContacto(){
    this.opcion = 1
  }

  actualizarContactoBoton(){
    let contactoModificado = {
      "telefono": this.telefono,
      "whatsapp": this.whatsapp,
      "correo": this.correo
    }

    let inputTel:any = document.getElementById("inputTelefono");
    let validoTel = inputTel.reportValidity()
    let inputWWhat:any = document.getElementById("inputWhats");
    let validoWhat = inputWWhat.reportValidity()
    let inputCorreo:any = document.getElementById("inputCorreo");
    let validoCorreo = inputCorreo.reportValidity()

    if(validoTel && validoWhat && validoCorreo){
      this.servicio.postUrl("/videos-api/contacto/actualizarDatos", contactoModificado).subscribe(
        (res: any) => {{
          this.buscarContacto()
        }
  
        }
      )
      this.opcion = 0
      this.messageService.add({ severity: 'success', summary: 'Actualización de datos de contacto', detail: 'Se actualizaron los datos de contacto con éxito.' });

    }
  }
}
