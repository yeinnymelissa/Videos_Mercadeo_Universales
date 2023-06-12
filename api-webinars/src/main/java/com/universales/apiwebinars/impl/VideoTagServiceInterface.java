package com.universales.apiwebinars.impl;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.apiwebinars.dto.VideoTagDto;
import com.universales.apiwebinars.entity.WebinarsVideo;
import com.universales.apiwebinars.entity.WebinarsVideoTag;

@RestController
@RequestMapping("/videos-api/tags")
@CrossOrigin
public interface VideoTagServiceInterface {
	@GetMapping("/obtenerVideos/{tag}")
	public List<WebinarsVideo> obtenerVideos(@PathVariable("tag") String tag);
	
	@GetMapping("/obtenerVideos2/{tag}")
	public List<Map<String, Object>> obtenerVideos2(@PathVariable("tag") String tag);
	
	@GetMapping("/obtenerVideosId/{id}")
	public List<WebinarsVideoTag> obtenerVideosId(@PathVariable("id") int id);
	
	@PostMapping("/guardarTag")
	public void guardarVideo(@RequestBody VideoTagDto tag);
	
	@DeleteMapping("/eliminarPorIdTag/{id}")
	public void eliminarPorIdTag(@PathVariable("id") int id);
}
