import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from '../pages/videos/videos.component';
import { AgrupadoresComponent } from '../pages/agrupadores/agrupadores.component';
import { ContactosComponent } from '../pages/contactos/contactos.component';
import { WebinarComponent } from '../pages/webinar/webinar.component';
import { ContactoPageComponent } from '../pages/contacto-page/contacto-page.component';

const routes: Routes = [
  { path: 'videos', component: VideosComponent},
  { path: 'agrupadores', component: AgrupadoresComponent},
  { path: 'contacto', component: ContactosComponent},
  { path: 'webinar/:agrupador', component: WebinarComponent},
  { path: 'contactanos', component: ContactoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
