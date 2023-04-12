package com.universales.videoapi.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="AGRUPADOR_VIDEO", schema = "MERCADEO_VIDEO")
@Data
public class AgrupadorVideo implements Serializable{

	private static final long serialVersionUID = 8622538428263300570L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE,
		generator="secuenciaAgrupador") 
	@SequenceGenerator(name="secuenciaAgrupador",sequenceName="sec_agrupador", allocationSize=1, initialValue = 1, schema = "MERCADEO_VIDEO")
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
	
	@OneToMany(mappedBy="idAgrupadorVideo", fetch = FetchType.EAGER)
    private List<Video> videos;
}
