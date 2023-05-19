package com.universales.apiwebinars.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.universales.apiwebinars.entity.WebinarsAgrupadorVideo;
import com.universales.apiwebinars.entity.WebinarsVideo;



@Repository("webinarsVideoRepository")
public interface WebinarsVideoRepository extends JpaRepository<WebinarsVideo, Serializable>{
	public List<WebinarsVideo> findByEstadoOrderByGrabacionFechaDesc(char estado);
	public List<WebinarsVideo> findByWebinarsAgrupadorVideoOrderByGrabacionFechaDesc(WebinarsAgrupadorVideo agrupador);
	public WebinarsVideo findByIdVideoEquals(int id);
	
	@Query(value = "SELECT * FROM VIDEO ORDER BY GRABACION_FECHA DESC", 
			nativeQuery = true)
	List<WebinarsVideo> obtenerTodos();

}
