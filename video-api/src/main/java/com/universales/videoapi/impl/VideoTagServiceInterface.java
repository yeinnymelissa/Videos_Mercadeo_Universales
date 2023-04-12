package com.universales.videoapi.impl;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.videoapi.dto.VideoTagDto;
import com.universales.videoapi.entity.Video;

@RestController
@RequestMapping("/tags")
@CrossOrigin
public interface VideoTagServiceInterface {
	@GetMapping("/obtenerVideos/{tag}")
	public List<Video> obtenerVideos(@PathVariable("tag") String tag);
	
	@PostMapping("/guardarTag")
	public void guardarVideo(@RequestBody VideoTagDto tag);
}
