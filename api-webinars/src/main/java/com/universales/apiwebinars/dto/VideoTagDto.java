package com.universales.apiwebinars.dto;

import java.util.Date;

import lombok.Data;

@Data
public class VideoTagDto {
	private int id;
	private int idVideo;
	private String nombreTag;
	private char estado;
	private String grabacionUsuario;
	private Date grabacionFecha;
	private String modificacionUsuario;
	private Date modificacionFecha;
}
