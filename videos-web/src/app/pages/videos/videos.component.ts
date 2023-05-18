import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { FormularioVideoComponent } from '../dialogs/formulario-video/formulario-video.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  videos:any[];
  opcion:number = 0;

  dialogRef: any
  

  constructor(private dialog: MatDialog, private servicio:GenericApiService, private app:AppServiceService, private messageService: MessageService){
    this.buscarVideos();
    this.videos = [];
  }

  ngOnInit(){
    this.buscarVideos();
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

  abrirFormulario(video){
    this.dialogRef = this.dialog.open(FormularioVideoComponent, {

       maxWidth: '500px',
      
       maxHeight: '500px',
      
       data: video 
      
        });
      
        this.dialogRef.afterClosed().subscribe(result => {
      
      // refresh table ()
        this.buscarVideos();
      
        });
  }
}
