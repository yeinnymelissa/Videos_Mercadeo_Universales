package com.universales.videoapi.dto;

import lombok.Data;

@Data
public class AgrupadorVideoFormatoDto {
	private String name;
	private String description;
	private String route;
	private String icon;
	private String keyValue;
	private String status;
	private AgrupadorVideoFormatoDto[] childs;
	private String parent;
	private String service;
	private boolean root;
	
}
