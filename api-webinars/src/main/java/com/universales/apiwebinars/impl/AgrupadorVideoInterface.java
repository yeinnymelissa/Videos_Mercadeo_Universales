package com.universales.apiwebinars.impl;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.apiwebinars.dto.AgrupadorVideoDto;
import com.universales.apiwebinars.dto.AgrupadorVideoFormatoDto;
import com.universales.apiwebinars.entity.AgrupadorVideo;

@RestController
@RequestMapping("/videos-api/agrupadorvideo")
@CrossOrigin
public interface AgrupadorVideoInterface {
	@GetMapping("/obtener")
	public List<AgrupadorVideo> obtenerAgrupadores();
	
	@PostMapping("/guardarAgrupador")
	public void guardarAgrupador(@RequestBody AgrupadorVideoDto agrupador);
	
	@PutMapping("/modificarAgrupador")
	public void actualizarAgrupador(@RequestBody AgrupadorVideoDto agrupador);
	
	@GetMapping("/obtenerEstado")
	public List<AgrupadorVideoFormatoDto> obtenerAgrupadoresPorEstado();

	@GetMapping("/obtenerId/{id}")
	public AgrupadorVideo obtenerAgrupador(@PathVariable("id") Integer id);
}
