package com.universales.videoapi.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.videoapi.entity.Video;



@Repository("videoRepository")
public interface VideoRepository extends JpaRepository<Video, Serializable>{
	public List<Video> findByEstadoOrderByGrabacionFechaAsc(char estado);

}
