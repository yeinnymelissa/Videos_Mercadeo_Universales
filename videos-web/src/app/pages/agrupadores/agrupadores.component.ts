import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agrupadores',
  templateUrl: './agrupadores.component.html',
  styleUrls: ['./agrupadores.component.scss']
})
export class AgrupadoresComponent {
  usuario:any;
  agrupadores:any[];
  estadoNodo: any[];
  estadoEleccion:any;
  opcion:number = 0;

  nombreAgrupador:String = "";
  idAgrupador:number = 0;


  constructor(private servicio:GenericApiService, private app:AppServiceService, private messageService: MessageService){
    this.buscarAgrupadores()
    this.getUsuario()
    this.agrupadores = []
    this.estadoNodo = [{"label" : "Activo", "id": "A"}, {"label" : "Inactivo", "id": "I"}]
  }

  buscarAgrupadores(){
    this.servicio.getUrl("/videos-api/agrupadorvideo/obtener").subscribe(
    (res: any) => this.llenarAgrupadores(res)
    )
    
  }

  llenarAgrupadores(res:any){
    this.agrupadores = res
  }

  obtenerEstado(estado:any) : String{
    if(estado == 'A'){
      return "Activo"    
    }else if(estado == 'I'){
      return "Inactivo"
    }
    return ""
  }

  getUsuario(){
    this.usuario = this.app.getUser().usuario
  }

  actualizarAgrupador(id:any){
    this.opcion = 1
    this.idAgrupador = id
    this.servicio.getUrl("/videos-api/agrupadorvideo/obtenerId/"+id).subscribe(
      (res: any) => {
        this.nombreAgrupador = res.nombre
        this.estadoEleccion = {"label" : this.obtenerEstado(res.estado), "id" : res.estado}
      }
    )
  }

  cancelarOperacion(){
    this.opcion = 0
  }

  actualizarAgrupadorBoton(){
    let inputNombre:any = document.getElementById("inputNombre");
    let validoNom = inputNombre.reportValidity()

    if(validoNom){
      let agrupadorModificado = {
        "idAgrupador": this.idAgrupador,
        "nombre": this.nombreAgrupador,
        "estado": this.estadoEleccion.id,
        "modificacionUsuario": this.usuario
      }
  
      this.servicio.putUrl("/videos-api/agrupadorvideo/modificarAgrupador", agrupadorModificado).subscribe(
        (res: any) => {
          console.log(res)
        }
      )
  
      this.buscarAgrupadores()
      this.opcion = 0
      this.messageService.add({ severity: 'success', summary: 'Actualización del agrupador', detail: 'Se actualizó el agrupador con éxito.' });
    }
  }


  guardarAgrupador(){
    this.opcion = 2
    this.nombreAgrupador = ""
    this.estadoEleccion = {"label" : "Activo", "id" : "A"}
  }

  guardarAgrupadorBoton(){
    let inputNombre:any = document.getElementById("inputNombre");
    let validoNom = inputNombre.reportValidity()

    if(validoNom){

      let agrupadorGuardar = {
        "nombre": this.nombreAgrupador,
        "estado": this.estadoEleccion.id,
        "grabacionUsuario": this.usuario
      }
  
      this.servicio.postUrl("/videos-api/agrupadorvideo/guardarAgrupador", agrupadorGuardar).subscribe(
        (res: any) => {
          this.buscarAgrupadores()
        }
      )
      this.opcion = 0
      this.messageService.add({ severity: 'success', summary: 'Guardar agrupador', detail: 'Se guardó el agrupador con éxito.' });
    }
  }
}
