import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AppSecurityApiService } from 'src/app/_services/app-security-api.service';
import { AppServiceService } from 'src/app/_services/app-service.service';
import { GenericApiService } from 'src/app/_services/generic-api.service';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.scss']
})
export class FormularioContactoComponent {
  contactoGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<FormularioContactoComponent>
    , private messageService: MessageService
    , private servicio: GenericApiService
    , @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder
    , private security: AppSecurityApiService
    , private app: AppServiceService) {
    this.contactoGroup = this.fb.group({
      telefono: [null, Validators.required],
      whatsapp: [null, Validators.required],
      correo: [null, Validators.required]
    })

    this.contactoGroup.patchValue({
      telefono: data.telefono,
      whatsapp: data.whatsapp,
      correo: data.correo
    });
    
  }

  actualizarContactoBoton(){
    let contactoModificado = {
      "telefono": this.contactoGroup.value.telefono,
      "whatsapp": this.contactoGroup.value.whatsapp,
      "correo": this.contactoGroup.value.correo
    }

    this.servicio.postUrl("/videos-api/contacto/actualizarDatos", contactoModificado).subscribe(
      (res: any) => {

      }
    )
    this.security.messageAlert("Se actualizaron los datos de contacto con éxito.", 0, "Actualización de datos de contacto", this.messageService)
    this.dialogRef.close()
  }
}
