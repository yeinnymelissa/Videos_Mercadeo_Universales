package com.universales.apiwebinars.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.apiwebinars.entity.WebinarsAgrupadorVideo;

@Repository("webinarsAgrupadorVideoRepository")
public interface WebinarsAgrupadorVideoRepository extends JpaRepository<WebinarsAgrupadorVideo, Serializable>{
	public List<WebinarsAgrupadorVideo> findByEstado(char estado);
}
