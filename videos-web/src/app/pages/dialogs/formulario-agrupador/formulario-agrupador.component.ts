import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AppSecurityApiService } from 'src/app/_services/app-security-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';
import { GenericApiService } from 'src/app/_services/generic-api.service';

@Component({
  selector: 'app-formulario-agrupador',
  templateUrl: './formulario-agrupador.component.html',
  styleUrls: ['./formulario-agrupador.component.scss']
})
export class FormularioAgrupadorComponent {
  agrupadorGroup: FormGroup;

  estadoNodo: any[];
  estadoEleccion: any;


  usuario: any;

  constructor(public dialogRef: MatDialogRef<FormularioAgrupadorComponent>
    , private messageService: MessageService
    , private servicio: GenericApiService
    , @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder
    , private security: AppSecurityApiService
    , private app: AppServiceService) {
    this.estadoNodo = []
    this.usuario = this.app.getUser().usuario
    this.estadoNodo = [{ "label": "Activo", "id": "A" }, { "label": "Inactivo", "id": "I" }]
    this.agrupadorGroup = this.fb.group({
      idAgrupador: [null],
      nombreAgrupador: [null, Validators.required],
      estadoEleccion: [null, Validators.required]
    })
    
    this.agrupadorGroup.get('idAgrupador').disable();

    if (data) {
      this.agrupadorGroup.patchValue({
        idAgrupador: data.idAgrupador,
        nombreAgrupador: data.nombre,
        estadoEleccion: { "label": this.obtenerEstado(data.estado), "id": data.estado }
      });
    }
  }

  obtenerEstado(estado: any): String {
    if (estado == 'A') {
      return "Activo"
    } else if (estado == 'I') {
      return "Inactivo"
    }
    return ""
  }

  actualizarAgrupadorBoton() {
    
    this.agrupadorGroup.get('idAgrupador').enable();
    let agrupadorModificado = {
      "idAgrupador": this.agrupadorGroup.value.idAgrupador,
      "nombre": this.agrupadorGroup.value.nombreAgrupador,
      "estado": this.agrupadorGroup.value.estadoEleccion.id,
      "modificacionUsuario": this.usuario
    }

    this.servicio.putUrl("/videos-api/agrupadorvideo/modificarAgrupador", agrupadorModificado).subscribe(
      (res: any) => {
        console.log(res);
        
      }
    )
    this.security.messageAlert("Se actualizó el agrupador con éxito.", 0, "Actualización de agrupador", this.messageService)
    this.dialogRef.close()
  }

  guardarAgrupadorBoton() {

    let agrupadorGuardar = {
      "nombre": this.agrupadorGroup.value.nombreAgrupador,
      "estado": this.agrupadorGroup.value.estadoEleccion.id,
      "grabacionUsuario": this.usuario
    }

    this.servicio.postUrl("/videos-api/agrupadorvideo/guardarAgrupador", agrupadorGuardar).subscribe(
      (res: any) => {
      }
    )
    this.security.messageAlert("Se creó el agrupador con éxito.", 0, "Creación de agrupador", this.messageService)
    this.dialogRef.close()
  }
}
