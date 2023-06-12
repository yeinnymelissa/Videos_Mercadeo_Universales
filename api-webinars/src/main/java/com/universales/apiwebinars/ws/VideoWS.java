package com.universales.apiwebinars.ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.apiwebinars.dto.VideoDto;
import com.universales.apiwebinars.dto.VideoTagDto;
import com.universales.apiwebinars.entity.WebinarsAgrupadorVideo;
import com.universales.apiwebinars.entity.WebinarsVideo;
import com.universales.apiwebinars.entity.WebinarsVideoTag;
import com.universales.apiwebinars.impl.VideoServiceInterface;
import com.universales.apiwebinars.repository.WebinarsAgrupadorVideoRepository;
import com.universales.apiwebinars.repository.WebinarsVideoRepository;
import com.universales.apiwebinars.repository.WebinarsVideoTagRepository;
import com.universales.apiwebinars.service.VideoService;
import com.universales.apiwebinars.service.VideoTagService;


@Component
public class VideoWS implements VideoServiceInterface{
	@Autowired
	WebinarsAgrupadorVideoRepository avr;
	
	@Autowired
	WebinarsVideoRepository vr;
	
	@Autowired
	WebinarsVideoTagRepository videoTagRepo;
	
	@Autowired
	VideoTagService vts;
	
	@Autowired
	VideoService vs;

	@Override
	public List<WebinarsVideo> obtenerVideosOrdenados() {
		return vr.findByEstadoOrderByGrabacionFechaDesc('A');
	}

	@Override
	public void guardarVideo(VideoDto video) {
		WebinarsVideo vid = new WebinarsVideo();
		vid.setDuracion(video.getDuracion());
		vid.setExpositor(video.getExpositor());
		vid.setNombre(video.getNombre());
		vid.setDescripcion(video.getDescripcion());
		vid.setEstado(video.getEstado());
		vid.setGrabacionUsuario(video.getGrabacionUsuario());
        Date date = new Date();
		vid.setGrabacionFecha(date);
		vid.setWebinarsAgrupadorVideo(video.getWebinarsAgrupadorVideo());
		vid.setEnlace(video.getEnlace());
		vr.save(vid);
		for (VideoTagDto tag : video.getTags()) {
			if(tag.getId() == -1) {
				WebinarsVideoTag tagAux = new WebinarsVideoTag();
				tagAux.setIdVideo(vid.getIdVideo());
				tagAux.setNombreTag(tag.getNombreTag());
				tagAux.setEstado('A');
				tagAux.setGrabacionFecha(date);
				tagAux.setGrabacionUsuario(tag.getGrabacionUsuario());
				videoTagRepo.save(tagAux);
			}
		}
	}

	@Override
	public void actualizarVideo(VideoDto video) {
		Optional<WebinarsVideo> vid = vr.findById(video.getIdVideo());
		if(vid.isPresent()){
			vid.get().setDuracion(video.getDuracion());
			vid.get().setExpositor(video.getExpositor());
			vid.get().setNombre(video.getNombre());
			vid.get().setDescripcion(video.getDescripcion());
			vid.get().setEstado(video.getEstado());
			vid.get().setModificacionUsuario(video.getModificacionUsuario());
	        Date date = new Date();
			vid.get().setModificacionFecha(date);
			vid.get().setWebinarsAgrupadorVideo(video.getWebinarsAgrupadorVideo());
			vid.get().setEnlace(video.getEnlace());
			vr.save(vid.get());
			
			for (VideoTagDto tag : video.getTags()) {
				if(tag.getId() == -1) {
					WebinarsVideoTag tagAux = new WebinarsVideoTag();
					tagAux.setIdVideo(video.getIdVideo());
					tagAux.setNombreTag(tag.getNombreTag());
					tagAux.setEstado('A');
					tagAux.setGrabacionFecha(date);
					tagAux.setGrabacionUsuario(tag.getGrabacionUsuario());
					videoTagRepo.save(tagAux);
				}
			}
			
		}
	}

	@Override
	public List<WebinarsVideoTag> obtenerVideosTag() {
		return videoTagRepo.findAll();
	}

	@Override
	public List<WebinarsVideo> obtenerTodosOrdenados() {
		return vr.findAll();
	}

	@Override
	public WebinarsVideo obtenerVideoPorId(Integer id) {
		return vr.findByIdVideoEquals(id);
	}

	@Override
	public boolean eliminarPorId(int id) {
		vts.eliminarPorIdVideo(id);
		return true;
	}

	@Override
	public List<WebinarsVideo> obtenerPorAgrupador(Integer id) {
		Optional<WebinarsAgrupadorVideo> ag = avr.findById(id);
		if(ag.isPresent()) {
			return vr.findByWebinarsAgrupadorVideoOrderByGrabacionFechaDesc(ag.get());
		}
		
		return new ArrayList<>();
	}

}
