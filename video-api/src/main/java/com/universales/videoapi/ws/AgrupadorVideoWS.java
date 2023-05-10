package com.universales.videoapi.ws;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.videoapi.dto.AgrupadorVideoDto;
import com.universales.videoapi.dto.AgrupadorVideoFormatoDto;
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
        Date date = new Date();
		av.setGrabacionFecha(date);
		
		avr.save(av);
	}

	@Override
	public void actualizarAgrupador(AgrupadorVideoDto agrupador) {
		Optional<AgrupadorVideo> ag = avr.findById(agrupador.getIdAgrupador());
		if(ag.isPresent()){
			ag.get().setIdAgrupador(agrupador.getIdAgrupador());
			ag.get().setNombre(agrupador.getNombre());
			ag.get().setEstado(agrupador.getEstado());
			ag.get().setModificacionUsuario(agrupador.getModificacionUsuario());
	        Date date = new Date();
			ag.get().setModificacionFecha(date);
			avr.save(ag.get());
			
		}
	}

	@Override
	public List<AgrupadorVideoFormatoDto> obtenerAgrupadoresPorEstado() {
		List<AgrupadorVideo> agrupadores = avr.findByEstado('A');
		List<AgrupadorVideoFormatoDto> formatoAgrupadores = new LinkedList<>();
		
		for (AgrupadorVideo agrupador : agrupadores) {
			AgrupadorVideoFormatoDto format = new AgrupadorVideoFormatoDto();
			
			format.setName(agrupador.getNombre());
			format.setDescription(agrupador.getNombre());
			format.setRoute("webinar/"+agrupador.getIdAgrupador());
			format.setIcon(null);
			format.setKeyValue(null);
			format.setStatus(null);
			AgrupadorVideoFormatoDto[] vacio = {};
			format.setChilds(vacio);
			format.setParent(null);
			format.setService(null);
			format.setRoot(true);
			
			formatoAgrupadores.add(format);
		}
		
		return formatoAgrupadores;
	}

	@Override
	public AgrupadorVideo obtenerAgrupador(Integer id) {
		Optional<AgrupadorVideo> ag = avr.findById(id);
		if(ag.isPresent()) {
			return ag.get();
		}
		
		return null;
	}

	
}
