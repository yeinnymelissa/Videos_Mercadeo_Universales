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
@Table(name="WEBINARS_AGRUPADOR_VIDEO", schema = "MAIN_REDES_SOCIALES")
@Data
public class WebinarsAgrupadorVideo implements Serializable{

	private static final long serialVersionUID = 8622538428263300570L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE,
		generator="secuenciaAgrupador") 
	@SequenceGenerator(name="secuenciaAgrupador",sequenceName="WEBINARS_AGRUPADOR_VIDEO_SEQ", allocationSize=1, initialValue = 1, schema = "MAIN_REDES_SOCIALES")
	@Column(name="ID_AGRUPADOR")
	private int idAgrupador;
	
	@Column(name="NOMBRE")
	private String nombre;
	
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
