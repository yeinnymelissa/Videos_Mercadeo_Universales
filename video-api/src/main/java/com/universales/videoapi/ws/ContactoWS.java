package com.universales.videoapi.ws;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.videoapi.dto.ContactoDto;
import com.universales.videoapi.impl.ContactoServiceInterface;
import com.universales.videoapi.service.ContactoService;

@Component
public class ContactoWS implements ContactoServiceInterface{
	
	private static final String DESCRIP = "DESCRIP";
	
	@Autowired
	ContactoService cs;

	@Override
	public String obtenerTelefono() {
		return (String)cs.obtenerContacto("VIDEO_TELEFONO", "1").get(0).get(DESCRIP);
	}

	@Override
	public String obtenerWhatsapp() {
		return (String)cs.obtenerContacto("VIDEO_WHATSAPP", "2").get(0).get(DESCRIP);
	}

	@Override
	public String obtenerCorreo() {
		return (String)cs.obtenerContacto("VIDEO_CORREO", "3").get(0).get(DESCRIP);
	}

	@Override
	public Map<String, String> obtenerTodos() {
		Map<String, String> datosContacto = new HashMap<>();
		datosContacto.put("telefono", (String)cs.obtenerContacto("VIDEO_TELEFONO", "1").get(0).get(DESCRIP));
		datosContacto.put("whatsapp", (String)cs.obtenerContacto("VIDEO_WHATSAPP", "2").get(0).get(DESCRIP));
		datosContacto.put("correo", (String)cs.obtenerContacto("VIDEO_CORREO", "3").get(0).get(DESCRIP));
		
		return datosContacto;
	}

	@Override
	public void actualizarDatos(ContactoDto contacto) {
		cs.actualizarContacto("VIDEO_TELEFONO", "1", contacto.getTelefono());
		cs.actualizarContacto("VIDEO_WHATSAPP", "2", contacto.getWhatsapp());
		cs.actualizarContacto("VIDEO_CORREO", "3", contacto.getCorreo());
		
	}

}
