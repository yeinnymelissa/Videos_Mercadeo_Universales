import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSecurityApiService } from 'src/app/_services/app-security-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';

@Component({
  selector: 'app-formulario-video',
  templateUrl: './formulario-video.component.html',
  styleUrls: ['./formulario-video.component.scss']
})
export class FormularioVideoComponent {

  videoGroup: FormGroup; 
  
  values:any[];
  idVideo:number;
  duracionVideo: number = 0;
  expositorVideo:String = "";
  nombreVideo: String = "";
  descripcionVideo:String = "";
  enlaceVideo:String = "";
  agrupador: any = null;
  nodes: any[];
  selectedNodes:any;
  estadoNodo: any[];
  estadoEleccion:any;
  videos:any[];

  
  usuario:any;

  constructor(public dialogRef: MatDialogRef<FormularioVideoComponent>
    , private messageService: MessageService
    , private servicio:GenericApiService
    , @Inject(MAT_DIALOG_DATA) public data: any
    , private fb:FormBuilder
    , private security: AppSecurityApiService
    , private app:AppServiceService){
    this.values = []
    this.nodes = []
    this.estadoNodo = []
    this.videos = []
    this.usuario = this.app.getUser().usuario
    this.estadoNodo = [{"label" : "Activo", "id": "A"}, {"label" : "Inactivo", "id": "I"}]
    this.videoGroup = this.fb.group({
      idVideo : [null],
      duracionVideo : [null, Validators.required],
      expositorVideo : [null, Validators.required],
      nombreVideo : [null, Validators.required],
      descripcionVideo : [null, Validators.required],
      enlaceVideo : [null, Validators.required],
      selectedNodes : [null, Validators.required],
      estadoEleccion : [null, Validators.required],
      values : [null, Validators.required],
    })
    this.videoGroup.get('idVideo').disable();

    this.servicio.getUrl("/videos-api/agrupadorvideo/obtener").subscribe(
      (res: any) => {
        this.nodes = res;
      }
    )
    console.log(data)

    if(data){
      this.videoGroup.patchValue({
        idVideo : data.idVideo,
        duracionVideo : data.duracion,
        expositorVideo : data.expositor,
        nombreVideo : data.nombre,
        descripcionVideo : data.descripcion,
        enlaceVideo : data.enlace,
        selectedNodes : data.webinarsAgrupadorVideo,
        estadoEleccion : {"label" : this.obtenerEstado(data.estado), "id" : data.estado}
      });
      this.servicio.getUrl("/videos-api/tags/obtenerVideosId/"+data.idVideo).subscribe(
        (res: any) => {
          this.videoGroup.patchValue({
            values : res,
          });

        }
      )
    }
  }

  actualizarVideoBoton(){

    let tagsVideo = "";

    for (let i = 0; i < this.videoGroup.value.values.length; i++) {
      if(i == this.videoGroup.value.values.length - 1){
        tagsVideo += this.videoGroup.value.values[i]
      }else{
        tagsVideo += this.videoGroup.value.values[i] + ";"
      }
      
    }
    this.videoGroup.get('idVideo').enable();

    let videoModificado = {
      "idVideo": this.videoGroup.value.idVideo,
      "duracion": this.videoGroup.value.duracionVideo,
      "expositor": this.videoGroup.value.expositorVideo,
      "nombre": this.videoGroup.value.nombreVideo,
      "descripcion": this.videoGroup.value.descripcionVideo,
      "estado": this.videoGroup.value.estadoEleccion.id,
      "modificacionUsuario": this.usuario,
      "webinarsAgrupadorVideo": {
          "idAgrupador": this.videoGroup.value.selectedNodes.idAgrupador
      },
      "enlace": this.videoGroup.value.enlaceVideo,
      "tags": tagsVideo
    };
    

    this.servicio.deleteUrl("/videos-api/videos/eliminarPorId/"+this.videoGroup.value.idVideo).subscribe(
      (res: any) => {
      }
    );

    this.servicio.putUrl("/videos-api/videos/modificarVideo", videoModificado).subscribe(
      (res: any) => {
      }
    );

    this.security.messageAlert("Se actualizó el video con éxito.", 0, "Actualización de video", this.messageService);
    this.dialogRef.close();
  
  }

  guardarVideoBoton(){
    
    let tagsVideo = "";

    for (let i = 0; i < this.videoGroup.value.values.length; i++) {
      if(i == this.videoGroup.value.values.length - 1){
        tagsVideo += this.videoGroup.value.values[i]
      }else{
        tagsVideo += this.videoGroup.value.values[i] + ";"
      }
      
    }

    let videoGuardar = {
      "duracion": this.videoGroup.value.duracionVideo,
      "expositor": this.videoGroup.value.expositorVideo,
      "nombre": this.videoGroup.value.nombreVideo,
      "descripcion": this.videoGroup.value.descripcionVideo,
      "estado": this.videoGroup.value.estadoEleccion.id,
      "grabacionUsuario": this.usuario,
      "webinarsAgrupadorVideo": {
          "idAgrupador": this.videoGroup.value.selectedNodes.idAgrupador
      },
      "enlace": this.videoGroup.value.enlaceVideo,
      "tags": tagsVideo
    }
    console.log(videoGuardar);
    

    this.servicio.postUrl("/videos-api/videos/guardarVideo", videoGuardar).subscribe(
      (res: any) => {
      }
    )

    this.security.messageAlert("Se creó el video con éxito.", 0, "Creación de video", this.messageService)
    this.dialogRef.close()
  
  }
  
  obtenerEstado(estado:any) : String{
    if(estado == 'A'){
      return "Activo"    
    }else if(estado == 'I'){
      return "Inactivo"
    }
    return ""
  }
}
