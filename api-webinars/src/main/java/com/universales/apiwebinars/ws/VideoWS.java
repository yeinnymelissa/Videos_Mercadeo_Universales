package com.universales.apiwebinars.ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.apiwebinars.dto.VideoDto;
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
	WebinarsVideoTagRepository vtr;
	
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
		System.out.println(video.toString());
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
		if(!video.getTags().equals("") && video.getTags() != null) {
			String[] items = video.getTags().split(";");
			for (String item : items) {
				if(item != null) {
					WebinarsVideoTag tag = new WebinarsVideoTag();
					tag.setIdVideo(vid.getIdVideo());
					tag.setNombreTag(item);
					tag.setEstado('A');
					tag.setGrabacionFecha(date);
					tag.setGrabacionUsuario(video.getGrabacionUsuario());
					vtr.save(tag);
				}
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
			if(!video.getTags().equals("") && video.getTags() != null) {
				String[] items = video.getTags().split(";");
				for (String item : items) {
					if(item != null) {
						WebinarsVideoTag tag = new WebinarsVideoTag();
						tag.setIdVideo(vid.get().getIdVideo());
						tag.setNombreTag(item);
						vtr.save(tag);
					}
				}
			}
			
		}
	}

	@Override
	public List<WebinarsVideoTag> obtenerVideosTag() {
		return vtr.findAll();
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
