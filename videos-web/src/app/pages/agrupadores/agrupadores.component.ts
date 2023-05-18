import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { FormularioAgrupadorComponent } from '../dialogs/formulario-agrupador/formulario-agrupador.component';

@Component({
  selector: 'app-agrupadores',
  templateUrl: './agrupadores.component.html',
  styleUrls: ['./agrupadores.component.scss']
})
export class AgrupadoresComponent {
  agrupadores:any[];

  nombreAgrupador:String = "";
  idAgrupador:number = 0;

  dialogRef: any


  constructor(private dialog: MatDialog, private servicio:GenericApiService, private app:AppServiceService, private messageService: MessageService){
    this.buscarAgrupadores();
    this.agrupadores = [];
  }

  buscarAgrupadores(){
    this.servicio.getUrl("/videos-api/agrupadorvideo/obtener").subscribe(
    (res: any) => this.llenarAgrupadores(res)
    );
    
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


  abrirFormulario(agrupador){
    this.dialogRef = this.dialog.open(FormularioAgrupadorComponent, {

       maxWidth: '500px',
      
       maxHeight: '500px',
      
       data: agrupador 
      
        });
      
        this.dialogRef.afterClosed().subscribe(result => {
      
      // refresh table ()
        this.buscarAgrupadores();
      
        });
  }
}
