import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './_util/app-interceptor';
import { AppRoutingModule } from './_util/app-routing.module';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


/* MATERIAL */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule} from '@angular/material/paginator'; 
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';


/* PRIMENG */
import { MessagesModule} from 'primeng/messages';
import { MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import { AppComponent } from './app.component';
import { StyleClassModule } from 'primeng/styleclass';

import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { VideosComponent } from './pages/videos/videos.component';
import { AgrupadoresComponent } from './pages/agrupadores/agrupadores.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';

import { ContactosComponent } from './pages/contactos/contactos.component';
import { WebinarComponent } from './pages/webinar/webinar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ContactoPageComponent } from './pages/contacto-page/contacto-page.component';
import { FormularioVideoComponent } from './pages/dialogs/formulario-video/formulario-video.component';
import { FormularioAgrupadorComponent } from './pages/dialogs/formulario-agrupador/formulario-agrupador.component';
import { FormularioContactoComponent } from './pages/dialogs/formulario-contacto/formulario-contacto.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    AgrupadoresComponent,
    ContactosComponent,
    WebinarComponent,
    BuscarComponent,
    ContactoPageComponent,
    FormularioVideoComponent,
    FormularioAgrupadorComponent,
    FormularioContactoComponent
    
  ],
  imports: [
    SidebarModule,
    NavbarModule,
    FooterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule,
    /* primeNg*/
    MessageModule,
    ToastModule,
    MessagesModule,
    ConfirmPopupModule,
    TableModule,
    ButtonModule,
    TreeSelectModule,
    ChipsModule,
    StyleClassModule,
    CardModule,
    InputTextareaModule,
    FieldsetModule,
    DividerModule,
    DropdownModule,
    /* material*/
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: MessageService},
    { provide: ConfirmationService},
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
