package com.universales.apiwebinars.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.universales.apiwebinars.entity.AgrupadorVideo;
import com.universales.apiwebinars.entity.Video;



@Repository("videoRepository")
public interface VideoRepository extends JpaRepository<Video, Serializable>{
	public List<Video> findByEstadoOrderByGrabacionFechaDesc(char estado);
	public List<Video> findByAgrupadorVideoOrderByGrabacionFechaDesc(AgrupadorVideo agrupador);
	public Video findByIdVideoEquals(int id);
	
	@Query(value = "SELECT * FROM VIDEO ORDER BY GRABACION_FECHA DESC", 
			nativeQuery = true)
	List<Video> obtenerTodos();

}
