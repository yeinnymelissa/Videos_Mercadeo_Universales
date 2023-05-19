package com.universales.apiwebinars.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.universales.apiwebinars.entity.WebinarsVideoTag;

import jakarta.transaction.Transactional;


@Repository("webinarsVideoTagRepository")
public interface WebinarsVideoTagRepository extends JpaRepository<WebinarsVideoTag, Serializable>{
	public List<WebinarsVideoTag> findDistinctIdVideoByNombreTagContainingIgnoreCase(String tag);
	
	public List<WebinarsVideoTag> findByIdVideo(int id);
	
	public List<WebinarsVideoTag> deleteByIdVideo(int id);
	
	@Query(value = "SELECT DISTINCT ID_VIDEO FROM VIDEO_TAG WHERE NOMBRE_TAG LIKE '%'||:val||'%'", 
			nativeQuery = true)
	List<WebinarsVideoTag> obtenerPorTag(@Param("val") String val);
	
	@Transactional
	@Query(value = "delete from VIDEO_TAG where ID_VIDEO = :id", 
			nativeQuery = true)
	void deletePorIdVideo(@Param("id") int id);
}
