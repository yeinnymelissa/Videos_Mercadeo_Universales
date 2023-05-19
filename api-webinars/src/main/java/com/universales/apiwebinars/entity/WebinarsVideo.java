package com.universales.apiwebinars.entity;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="WEBINARS_VIDEO", schema = "MAIN_REDES_SOCIALES")
@Data
public class WebinarsVideo implements Serializable{
	
	private static final long serialVersionUID = 851192257864751861L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE,
		generator="secuenciaVideos") 
	@SequenceGenerator(name="secuenciaVideos",sequenceName="WEBINARS_VIDEO_SEQ", allocationSize=1, initialValue = 1, schema = "MAIN_REDES_SOCIALES")
	@Column(name="ID_VIDEO")
	private int idVideo;
	
	@Column(name="DURACION")
	private int duracion;
	
	@Column(name="EXPOSITOR")
	private String expositor;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Column(name="DESCRIPCION")
	private String descripcion;
	
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
	
	@ManyToOne
	@JoinColumn(name="ID_WEBINARS_AGRUPADOR_VIDEO")
	private WebinarsAgrupadorVideo webinarsAgrupadorVideo;
	
	@Column(name="ENLACE")
	private String enlace;

	
}
