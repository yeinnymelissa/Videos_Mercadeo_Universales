package com.universales.apiwebinars.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="WEBINARS_VIDEO_TAG", schema = "MAIN_REDES_SOCIALES")
@Data
public class WebinarsVideoTag implements Serializable{

	private static final long serialVersionUID = -3843979879631983000L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE,
		generator="secuenciaVTag") 
	@SequenceGenerator(name="secuenciaVTag",sequenceName="WEBINARS_VIDEO_TAG_SEQ", allocationSize=1, initialValue = 1, schema = "MAIN_REDES_SOCIALES")
	@Column(name="ID")
	private int id;
	
	@Column(name="ID_VIDEO")
	private int idVideo;
	
	@Column(name="NOMBRE_TAG")
	private String nombreTag;
	
	@Column(name="ESTADO")
	private char estado;
	
	@Column(name="GRABACION_USUARIO")
	private String grabacionUsuario;
	
	@Column(name="GRABACION_FECHA")
	private Date grabacionFecha;
	
	@Column(name="MODIFICACION_USUARIO")
	private String modificacionUsuario;
	
	@Column(name="MODIFICACION_FECHA")
	private Date modificacionFecha;
}
