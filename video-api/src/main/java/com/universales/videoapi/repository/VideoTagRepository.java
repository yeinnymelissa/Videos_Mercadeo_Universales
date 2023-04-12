package com.universales.videoapi.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.videoapi.entity.VideoTag;

@Repository("videoTagRepository")
public interface VideoTagRepository extends JpaRepository<VideoTag, Serializable>{
	public List<VideoTag> findByNombreTagContainingIgnoreCase(String tag);
}
