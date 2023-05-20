package com.universales.apiwebinars.impl;


import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.apiwebinars.dto.ContactoDto;



@RestController
@RequestMapping("/videos-api/contacto")
@CrossOrigin
public interface ContactoServiceInterface {
	@GetMapping("/telefono")
	public String obtenerTelefono();
	
	@GetMapping("/whatsapp")
	public String obtenerWhatsapp();
	
	@GetMapping("/correo")
	public String obtenerCorreo();
	
	@GetMapping("/datos")
	public Map<String, String> obtenerTodos();
	
	@PostMapping("/actualizarDatos")
	public void actualizarDatos(@RequestBody ContactoDto contacto);

}
