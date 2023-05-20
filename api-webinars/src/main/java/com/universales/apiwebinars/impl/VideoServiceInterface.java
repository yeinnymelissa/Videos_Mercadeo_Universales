package com.universales.apiwebinars.impl;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.apiwebinars.dto.VideoDto;
import com.universales.apiwebinars.entity.Video;
import com.universales.apiwebinars.entity.VideoTag;


@RestController
@RequestMapping("/videos-api/videos")
@CrossOrigin
public interface VideoServiceInterface {
	@GetMapping("/fecha")
	public List<Video> obtenerVideosOrdenados();
	
	@GetMapping("/todos")
	public List<Video> obtenerTodosOrdenados();
	
	@GetMapping("/porAgrupador/{id}")
	public List<Video> obtenerPorAgrupador(@PathVariable("id") Integer id);
	
	@GetMapping("/obtenerId/{id}")
	public Video obtenerVideoPorId(@PathVariable("id") Integer id);
	
	@PostMapping("/guardarVideo")
	public void guardarVideo(@RequestBody VideoDto video);
	
	@PutMapping("/modificarVideo")
	public void actualizarVideo(@RequestBody VideoDto video);

	@GetMapping("/tags")
	public List<VideoTag> obtenerVideosTag();
	
	@DeleteMapping("/eliminarPorId/{id}")
	public boolean eliminarPorId(@PathVariable("id") int id);
}
