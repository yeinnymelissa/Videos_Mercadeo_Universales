package com.universales.apiwebinars.dto;

import java.util.Date;

import com.universales.apiwebinars.entity.WebinarsAgrupadorVideo;

import lombok.Data;
@Data
public class VideoDto {
	
	private int idVideo;
	private int duracion;
	private String expositor;
	private String nombre;
	private String descripcion;
	private char estado;
	private String grabacionUsuario;
	private Date grabacionFecha;
	private String modificacionUsuario;
	private Date modificacionFecha;
	private WebinarsAgrupadorVideo webinarsAgrupadorVideo;
	private String enlace;
	private String tags;
}
