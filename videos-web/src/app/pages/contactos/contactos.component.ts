import { Component } from '@angular/core';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { FormularioContactoComponent } from '../dialogs/formulario-contacto/formulario-contacto.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent {
  contacto:any[];

  dialogRef: any;

  constructor(private dialog: MatDialog, private servicio:GenericApiService, private messageService: MessageService){
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
  }

  abrirFormulario(){
    this.dialogRef = this.dialog.open(FormularioContactoComponent, {

       maxWidth: '500px',
      
       maxHeight: '500px',
      
       data: this.contacto[0] 
      
        });
      
        this.dialogRef.afterClosed().subscribe(result => {
      
      // refresh table ()
        this.buscarContacto();
      
        });
  }
}
