package com.universales.videoapi.dto;

import java.util.Date;

import lombok.Data;
@Data
public class AgrupadorVideoDto {
	private int idAgrupador;
	private String nombre;
	private char estado;
	private String grabacionUsuario;
	private Date grabacionFecha;
	private String modificacionUsuario;
	private Date modificacionFecha;
}
