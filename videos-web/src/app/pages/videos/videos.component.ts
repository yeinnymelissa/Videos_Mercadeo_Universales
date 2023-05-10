import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  values:any[];
  nodes: any[];
  selectedNodes:any;
  estadoNodo: any[];
  estadoEleccion:any;
  usuario:any;
  videos:any[];
  opcion:number = 0;
  idVideo:number = 0;
  duracionVideo: number = 0;
  expositorVideo:String = "";
  nombreVideo: String = "";
  descripcionVideo:String = "";
  enlaceVideo:String = "";
  agrupador: any = null;
  

  constructor(private servicio:GenericApiService, private app:AppServiceService, private messageService: MessageService){
    this.buscarVideos()
    this.getUsuario()
    this.videos = []
    this.nodes = []
    this.values = []
    this.estadoNodo = [{"label" : "Activo", "id": "A"}, {"label" : "Inactivo", "id": "I"}]
  }

  ngOnInit(){
    this.buscarVideos()
    this.getUsuario()
    this.servicio.getUrl("/videos-api/agrupadorvideo/obtener").subscribe(
      (res: any) => {
        res.forEach(element => {
          this.nodes.push({"label" : element.nombre, "id": element.idAgrupador})
        });
      }
    )
  }

  buscarVideos(){
    this.servicio.getUrl("/videos-api/videos/todos").subscribe(
    (res: any) => this.llenarVideos(res)
    )
    
  }

  llenarVideos(res:any){
    this.videos = res
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

  actualizarVideo(id:any){
    this.opcion = 1
    this.idVideo = id
    this.servicio.getUrl("/videos-api/videos/obtenerId/"+id).subscribe(
      (res: any) => {
        this.duracionVideo = res.duracion
        this.expositorVideo = res.expositor
        this.nombreVideo = res.nombre
        this.descripcionVideo = res.descripcion
        this.enlaceVideo = res.enlace
        this.agrupador = res.agrupadorVideo
        this.selectedNodes = {"label" : this.agrupador.nombre, "id": this.agrupador.idAgrupador}
        this.estadoEleccion = {"label" : this.obtenerEstado(res.estado), "id" : res.estado}
      }
    )

    this.servicio.getUrl("/videos-api/tags/obtenerVideosId/"+id).subscribe(
      (res: any) => {
        this.values = res
      }
    )
  }

  cancelarOperacion(){
    this.opcion = 0
  }

  actualizarVideoBoton(){
    let inputDuracion:any = document.getElementById("inputDuracion");
    let validoDur = inputDuracion.reportValidity()
    let inputExpositor:any = document.getElementById("inputExpositor");
    let validoEx = inputExpositor.reportValidity()
    let inputNombre:any = document.getElementById("inputNombre");
    let validoNom = inputNombre.reportValidity()
    let inputEnlace:any = document.getElementById("inputEnlace");
    let validoEn = inputEnlace.reportValidity()

    if(validoDur && validoEx && validoNom && validoEn){

      let tagsVideo = "";
  
      for (let i = 0; i < this.values.length; i++) {
        if(i == this.values.length - 1){
          tagsVideo += this.values[i]
        }else{
          tagsVideo += this.values[i] + ";"
        }
        
      }
  
      let videoModificado = {
        "idVideo": this.idVideo,
        "duracion": this.duracionVideo,
        "expositor": this.expositorVideo,
        "nombre": this.nombreVideo,
        "descripcion": this.descripcionVideo,
        "estado": this.estadoEleccion.id,
        "modificacionUsuario": this.usuario,
        "agrupadorVideo": {
            "idAgrupador": this.selectedNodes.id
        },
        "enlace": this.enlaceVideo,
        "tags": tagsVideo
      }
  
  
  
      this.servicio.deleteUrl("/videos-api/videos/eliminarPorId/"+this.idVideo).subscribe(
        (res: any) => {
          this.buscarVideos()
        }
      )
  
      this.servicio.putUrl("/videos-api/videos/modificarVideo", videoModificado).subscribe(
        (res: any) => {
          this.buscarVideos()
        }
      )
  
      this.opcion = 0
      this.messageService.add({ severity: 'success', summary: 'Actualización de video', detail: 'Se actualizó el video con éxito.' });

    }
  }

  guardarVideo(){
    this.opcion = 2
    this.duracionVideo = 0
    this.expositorVideo = ""
    this.nombreVideo = ""
    this.descripcionVideo = ""
    this.enlaceVideo = ""
    this.estadoEleccion = {"label" : "Activo", "id" : "A"}
    this.values = []
    this.selectedNodes = this.nodes[0]
  }

  guardarVideoBoton(){
    
    let inputDuracion:any = document.getElementById("inputDuracion");
    let validoDur = inputDuracion.reportValidity()
    let inputExpositor:any = document.getElementById("inputExpositor");
    let validoEx = inputExpositor.reportValidity()
    let inputNombre:any = document.getElementById("inputNombre");
    let validoNom = inputNombre.reportValidity()
    let inputEnlace:any = document.getElementById("inputEnlace");
    let validoEn = inputEnlace.reportValidity()

    if(validoDur && validoEx && validoNom && validoEn){
      let tagsVideo = "";
  
      for (let i = 0; i < this.values.length; i++) {
        if(i == this.values.length - 1){
          tagsVideo += this.values[i]
        }else{
          tagsVideo += this.values[i] + ";"
        }
        
      }
  
      let videoGuardar = {
        "duracion": this.duracionVideo,
        "expositor": this.expositorVideo,
        "nombre": this.nombreVideo,
        "descripcion": this.descripcionVideo,
        "estado": this.estadoEleccion.id,
        "grabacionUsuario": this.usuario,
        "agrupadorVideo": {
            "idAgrupador": this.selectedNodes.id
        },
        "enlace": this.enlaceVideo,
        "tags": tagsVideo
      }
  
      this.servicio.postUrl("/videos-api/videos/guardarVideo", videoGuardar).subscribe(
        (res: any) => {
          console.log(res)
        }
      )
  
      this.buscarVideos()
      this.opcion = 0
      this.messageService.add({ severity: 'success', summary: 'Guardar video', detail: 'Se guardó el video con éxito.' });
    }
  }
}
