package com.universales.videoapi.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.universales.videoapi.entity.VideoTag;

import jakarta.transaction.Transactional;


@Repository("videoTagRepository")
public interface VideoTagRepository extends JpaRepository<VideoTag, Serializable>{
	public List<VideoTag> findDistinctIdVideoByNombreTagContainingIgnoreCase(String tag);
	
	public List<VideoTag> findByIdVideo(int id);
	
	public List<VideoTag> deleteByIdVideo(int id);
	
	@Query(value = "SELECT DISTINCT ID_VIDEO FROM VIDEO_TAG WHERE NOMBRE_TAG LIKE '%'||:val||'%'", 
			nativeQuery = true)
	List<VideoTag> obtenerPorTag(@Param("val") String val);
	
	@Transactional
	@Query(value = "delete from VIDEO_TAG where ID_VIDEO = :id", 
			nativeQuery = true)
	void deletePorIdVideo(@Param("id") int id);
}
