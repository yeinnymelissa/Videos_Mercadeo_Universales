package com.universales.apiwebinars.ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.apiwebinars.dto.VideoDto;
import com.universales.apiwebinars.entity.AgrupadorVideo;
import com.universales.apiwebinars.entity.Video;
import com.universales.apiwebinars.entity.VideoTag;
import com.universales.apiwebinars.impl.VideoServiceInterface;
import com.universales.apiwebinars.repository.AgrupadorVideoRepository;
import com.universales.apiwebinars.repository.VideoRepository;
import com.universales.apiwebinars.repository.VideoTagRepository;
import com.universales.apiwebinars.service.VideoService;
import com.universales.apiwebinars.service.VideoTagService;


@Component
public class VideoWS implements VideoServiceInterface{
	@Autowired
	AgrupadorVideoRepository avr;
	
	@Autowired
	VideoRepository vr;
	
	@Autowired
	VideoTagRepository vtr;
	
	@Autowired
	VideoTagService vts;
	
	@Autowired
	VideoService vs;

	@Override
	public List<Video> obtenerVideosOrdenados() {
		return vr.findByEstadoOrderByGrabacionFechaDesc('A');
	}

	@Override
	public void guardarVideo(VideoDto video) {
		Video vid = new Video();
		vid.setDuracion(video.getDuracion());
		vid.setExpositor(video.getExpositor());
		vid.setNombre(video.getNombre());
		vid.setDescripcion(video.getDescripcion());
		vid.setEstado(video.getEstado());
		vid.setGrabacionUsuario(video.getGrabacionUsuario());
        Date date = new Date();
		vid.setGrabacionFecha(date);
		vid.setAgrupadorVideo(video.getAgrupadorVideo());
		vid.setEnlace(video.getEnlace());
		vr.save(vid);
		if(!video.getTags().equals("") && video.getTags() != null) {
			String[] items = video.getTags().split(";");
			for (String item : items) {
				if(item != null) {
					VideoTag tag = new VideoTag();
					tag.setIdVideo(vid.getIdVideo());
					tag.setNombreTag(item);
					vtr.save(tag);
				}
			}
		}
	}

	@Override
	public void actualizarVideo(VideoDto video) {
		Optional<Video> vid = vr.findById(video.getIdVideo());
		if(vid.isPresent()){
			vid.get().setDuracion(video.getDuracion());
			vid.get().setExpositor(video.getExpositor());
			vid.get().setNombre(video.getNombre());
			vid.get().setDescripcion(video.getDescripcion());
			vid.get().setEstado(video.getEstado());
			vid.get().setModificacionUsuario(video.getModificacionUsuario());
	        Date date = new Date();
			vid.get().setModificacionFecha(date);
			vid.get().setAgrupadorVideo(video.getAgrupadorVideo());
			vid.get().setEnlace(video.getEnlace());
			vr.save(vid.get());
			if(!video.getTags().equals("") && video.getTags() != null) {
				String[] items = video.getTags().split(";");
				for (String item : items) {
					if(item != null) {
						VideoTag tag = new VideoTag();
						tag.setIdVideo(vid.get().getIdVideo());
						tag.setNombreTag(item);
						vtr.save(tag);
					}
				}
			}
			
		}
	}

	@Override
	public List<VideoTag> obtenerVideosTag() {
		return vtr.findAll();
	}

	@Override
	public List<Video> obtenerTodosOrdenados() {
		return vr.findAll();
	}

	@Override
	public Video obtenerVideoPorId(Integer id) {
		return vr.findByIdVideoEquals(id);
	}

	@Override
	public boolean eliminarPorId(int id) {
		vts.eliminarPorIdVideo(id);
		return true;
	}

	@Override
	public List<Video> obtenerPorAgrupador(Integer id) {
		Optional<AgrupadorVideo> ag = avr.findById(id);
		if(ag.isPresent()) {
			return vr.findByAgrupadorVideoOrderByGrabacionFechaDesc(ag.get());
		}
		
		return new ArrayList<>();
	}

}
