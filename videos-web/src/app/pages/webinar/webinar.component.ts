import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GenericApiService } from 'src/app/_services/generic-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})

export class WebinarComponent implements OnInit{
  opcion:number = 0
  opcionCarrusel:number = 0
  valorBusqueda: any  = ""
  videosBusqueda:any[]
  pipe = new DatePipe('en-US');
  agrupador:any;
  infoAgrupador:any;
  videos: any[];
  videoActual:any;
  videosCarousel:any[];
  elementosCarrusel: any[]
  elementosVisibles: any[]
  paginaActual: number = 0;
  paginasTotales: number = 0;
  constructor(private ruta:ActivatedRoute, private genericService:GenericApiService, public sanitizer: DomSanitizer){
    this.videos = [];
    this.videosCarousel = []
    this.elementosCarrusel = []

    this.elementosVisibles = []
    this.videosBusqueda = []
    this.opcion = 0
  }

  nuevaPaginaCarrousel() : void {
    const elementosPorPagina = 3;
    const numeroMaximo = this.paginaActual + elementosPorPagina
    this.elementosVisibles = []
    this.elementosCarrusel.map((elemento, index) => {
      if(index >= this.paginaActual && index < numeroMaximo ){
        this.elementosVisibles = [
          ...this.elementosVisibles,
          elemento
        ]
      }
      return elemento;
    })

  }

  cambiarSiguientePagina(): void{
    this.paginaActual += 1
    if(!this.elementosCarrusel[this.paginaActual] || this.paginaActual > this.paginasTotales-1){
      this.paginaActual -= 1
    }
    this.nuevaPaginaCarrousel()
  }
  cambiarAnteriorPagina(): void {
    this.paginaActual -= 1
    if(this.paginaActual < 0){
      this.paginaActual = 0
    }
    this.nuevaPaginaCarrousel()
  }

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((parametros: ParamMap) => {
      this.opcion = 0
      this.opcionCarrusel = 0
      this.elementosCarrusel = []
      this.elementosVisibles = []
      this.videosBusqueda = []
      this.paginaActual = 0
      this.valorBusqueda = ""
      this.agrupador = parseInt(parametros.get("agrupador")!);
      this.genericService.getUrl("/videos-api/videos/porAgrupador/"+ this.agrupador).subscribe(
        (res: any) => {
          let tmp:any = document.getElementById("pantalla");
          tmp.innerHTML = ''
          let tmp2:any = document.getElementById("informacion");
          tmp2.innerHTML = ''
          this.videos = res
          this.colocarVideos()
        }
      );
    })
  }

  colocarVideos(){
    if(this.videos.length > 0){
      this.videoActual = this.videos[0]
      for (let i = 1; i < this.videos.length; i++) {
        this.elementosCarrusel[i-1] = this.videos[i];
      }
      this.colocarVideoPrincipal()
      if(this.elementosCarrusel.length > 0){
        this.nuevaPaginaCarrousel()
        this.paginasTotales = Math.ceil(this.elementosCarrusel.length /3)
      }
    }
  }

  colocarVideoPrincipal(){

    if(this.videoActual){
      let vid:any = document.getElementById("pantalla");
      vid.innerHTML = '<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="'+this.videoActual.enlace+'" frameborder="0" allowfullscreen></iframe>'
      let tmp:any = document.getElementById("informacion");
      tmp.innerHTML = '<h6>WEBINARS UNIVERSALES</h6>'
                      + '<h1><strong>'+this.videoActual.nombre+'</strong></h1>'
                      + '<p>'+this.videoActual.descripcion+'</p>'
                      + '<p><strong>Expositor '+this.videoActual.expositor+'</strong></p>'
                      + '<p><strong>Duración '+this.videoActual.duracion+' min</strong></p>'
    }

  }

  obtenerUrlImagenInicio(url:any){
    let arregloUrl = url.split("/");
    let codigo = arregloUrl[arregloUrl.length-1]
    return 'https://img.youtube.com/vi/'+codigo+'/0.jpg'
  }

  cambiarVideoActual(id:any){
    this.videoActual  = this.videos.find(element => element.idVideo == id);
    this.elementosCarrusel = this.videos.filter(element => element.idVideo != id)
    this.paginaActual = 0
    this.colocarVideoPrincipal()
    this.nuevaPaginaCarrousel()
  }

  obtenerTiempo(fecha:any){
    var date = new Date(fecha)
    return this.pipe.transform(date, 'dd/MM/yyyy');
  }

  buscar(){
    const buscar:any = document.getElementById("inputbuscar")
    let valido:any = buscar.reportValidity()
    if(valido){
      this.opcion = 1
      this.genericService.getUrl("/videos-api/tags/obtenerVideos2/"+ this.valorBusqueda).subscribe(
        (res: any) => {
          this.videosBusqueda = res
        }
      );
    }
  }

  cambiarVideoActualBusqueda(id:any){
    this.opcion = 0
    this.genericService.getUrl("/videos-api/videos/obtenerId/"+ id).subscribe(
      (res: any) => {
        this.opcion = 0
        this.opcionCarrusel = 1
        this.videoActual  = res;
        this.elementosCarrusel = this.videosBusqueda.filter(element => element.ID_VIDEO != id)
        this.colocarVideoPrincipal()
        if(this.elementosCarrusel.length > 0){
          this.paginaActual = 0
          this.nuevaPaginaCarrousel()
          this.paginasTotales = Math.ceil((this.elementosCarrusel.length /3)+1)
        }

      }
    );
  }

  cambiarOrientacion(){
    this.videos.reverse()
    this.colocarVideos()
  }

  colocarVideosBusqueda(){
    if(this.videosBusqueda.length > 0){
      this.videoActual = this.videosBusqueda[0]
      for (let i = 1; i < this.videosBusqueda.length; i++) {
        this.elementosCarrusel[i-1] = this.videosBusqueda[i];
      }
      this.colocarVideoPrincipalBusqueda()
      if(this.elementosCarrusel.length > 0){
        this.nuevaPaginaCarrousel()
        this.paginasTotales = Math.ceil(this.elementosCarrusel.length /3)
      }
    }
  }

  colocarVideoPrincipalBusqueda(){

    if(this.videoActual){
      let vid:any = document.getElementById("pantalla");
      vid.innerHTML = '<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="'+this.videoActual.ENLACE+'" frameborder="0" allowfullscreen></iframe>'
      let tmp:any = document.getElementById("informacion");
      tmp.innerHTML = '<h6>WEBINARS UNIVERSALES</h6>'
                      + '<h1><strong>'+this.videoActual.NOMBRE+'</strong></h1>'
                      + '<p>'+this.videoActual.DESCRIPCION+'</p>'
                      + '<p><strong>Expositor '+this.videoActual.EXPOSITOR+'</strong></p>'
                      + '<p><strong>Duración '+this.videoActual.DURACION+' min</strong></p>'
    }

  }

  cambiarOrientacionBusqueda(){
    console.log("en busqueda")
    this.videosBusqueda.reverse()
    this.colocarVideosBusqueda()
  }

  regresoPrincipal(){
    this.opcion = 0
    this.opcionCarrusel = 0
    this.elementosCarrusel = []
    this.elementosVisibles = []
    this.videosBusqueda = []
    this.paginaActual = 0
    this.valorBusqueda = ""
    this.genericService.getUrl("/videos-api/videos/porAgrupador/"+ this.agrupador).subscribe(
      (res: any) => {
        let tmp:any = document.getElementById("pantalla");
        tmp.innerHTML = ''
        let tmp2:any = document.getElementById("informacion");
        tmp2.innerHTML = ''
        this.videos = res
        this.colocarVideos()
      }
    );
  }
}

