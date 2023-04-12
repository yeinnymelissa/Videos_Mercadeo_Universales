package com.universales.videoapi.ws;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.videoapi.dto.AgrupadorVideoDto;
import com.universales.videoapi.entity.AgrupadorVideo;
import com.universales.videoapi.impl.AgrupadorVideoInterface;
import com.universales.videoapi.repository.AgrupadorVideoRepository;

@Component
public class AgrupadorVideoWS implements AgrupadorVideoInterface{
	
	@Autowired
	AgrupadorVideoRepository avr;
	
	@Override
	public List<AgrupadorVideo> obtenerAgrupadores() {
		return avr.findAll();
	}

	@Override
	public void guardarAgrupador(AgrupadorVideoDto agrupador) {
		AgrupadorVideo av = new AgrupadorVideo();
		av.setIdAgrupador(agrupador.getIdAgrupador());
		av.setNombre(agrupador.getNombre());
		av.setEstado(agrupador.getEstado());
		av.setGrabacionUsuario(agrupador.getGrabacionUsuario());
		av.setGrabacionFecha(agrupador.getGrabacionFecha());
		av.setModificacionUsuario(agrupador.getModificacionUsuario());
		av.setModificacionFecha(agrupador.getModificacionFecha());
		
		avr.save(av);
	}

	@Override
	public void actualizarAgrupador(AgrupadorVideoDto agrupador) {
		Optional<AgrupadorVideo> ag = avr.findById(agrupador.getIdAgrupador());
		if(ag.isPresent()){
			ag.get().setIdAgrupador(agrupador.getIdAgrupador());
			ag.get().setNombre(agrupador.getNombre());
			ag.get().setEstado(agrupador.getEstado());
			ag.get().setGrabacionUsuario(agrupador.getGrabacionUsuario());
			ag.get().setGrabacionFecha(agrupador.getGrabacionFecha());
			ag.get().setModificacionUsuario(agrupador.getModificacionUsuario());
			ag.get().setModificacionFecha(agrupador.getModificacionFecha());
			avr.save(ag.get());
			
		}
	}

	
}
