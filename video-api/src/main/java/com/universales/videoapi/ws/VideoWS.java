package com.universales.videoapi.ws;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.videoapi.dto.VideoDto;
import com.universales.videoapi.entity.Video;
import com.universales.videoapi.entity.VideoTag;
import com.universales.videoapi.impl.VideoServiceInterface;
import com.universales.videoapi.repository.VideoRepository;
import com.universales.videoapi.repository.VideoTagRepository;


@Component
public class VideoWS implements VideoServiceInterface{
	
	@Autowired
	VideoRepository vr;
	
	@Autowired
	VideoTagRepository vtr;

	@Override
	public List<Video> obtenerVideosOrdenados() {
		return vr.findByEstadoOrderByGrabacionFechaAsc('A');
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
		vid.setGrabacionFecha(video.getGrabacionFecha());
		vid.setModificacionUsuario(video.getModificacionUsuario());
		vid.setModificacionFecha(video.getModificacionFecha());
		vid.setIdAgrupadorVideo(video.getIdAgrupadorVideo());
		vid.setEnlace(video.getEnlace());
		vr.save(vid);
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
			vid.get().setGrabacionUsuario(video.getGrabacionUsuario());
			vid.get().setGrabacionFecha(video.getGrabacionFecha());
			vid.get().setModificacionUsuario(video.getModificacionUsuario());
			vid.get().setModificacionFecha(video.getModificacionFecha());
			vid.get().setIdAgrupadorVideo(video.getIdAgrupadorVideo());
			vid.get().setEnlace(video.getEnlace());
			vr.save(vid.get());
			
		}
	}

	@Override
	public List<VideoTag> obtenerVideosTag() {
		return vtr.findAll();
	}

}
