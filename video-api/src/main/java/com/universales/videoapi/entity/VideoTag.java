package com.universales.videoapi.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="VIDEO_TAG", schema = "MERCADEO_VIDEO")
@Data
public class VideoTag implements Serializable{

	private static final long serialVersionUID = -3843979879631983000L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE,
		generator="secuenciaVTag") 
	@SequenceGenerator(name="secuenciaVTag",sequenceName="sec_vtags", allocationSize=1, initialValue = 1, schema = "MERCADEO_VIDEO")
	@Column(name="ID")
	private int id;
	
	@Column(name="ID_VIDEO")
	private int idVideo;
	
	@Column(name="NOMBRE_TAG")
	private String nombreTag;
}
