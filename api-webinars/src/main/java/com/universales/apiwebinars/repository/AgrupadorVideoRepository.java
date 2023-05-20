package com.universales.apiwebinars.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.apiwebinars.entity.AgrupadorVideo;

@Repository("agrupadorVideoRepository")
public interface AgrupadorVideoRepository extends JpaRepository<AgrupadorVideo, Serializable>{
	public List<AgrupadorVideo> findByEstado(char estado);
}
