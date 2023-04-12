package com.universales.videoapi.impl;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.videoapi.dto.AgrupadorVideoDto;
import com.universales.videoapi.entity.AgrupadorVideo;

@RestController
@RequestMapping("/agrupadorvideo")
@CrossOrigin
public interface AgrupadorVideoInterface {
	@GetMapping("/obtener")
	public List<AgrupadorVideo> obtenerAgrupadores();
	
	@PostMapping("/guardarAgrupador")
	public void guardarAgrupador(@RequestBody AgrupadorVideoDto agrupador);
	
	@PutMapping("/modificarAgrupador")
	public void actualizarAgrupador(@RequestBody AgrupadorVideoDto agrupador);
}
