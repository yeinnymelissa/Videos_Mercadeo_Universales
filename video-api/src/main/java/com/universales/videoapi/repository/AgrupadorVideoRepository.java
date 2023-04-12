package com.universales.videoapi.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.videoapi.entity.AgrupadorVideo;

@Repository("agrupadorVideoRepository")
public interface AgrupadorVideoRepository extends JpaRepository<AgrupadorVideo, Serializable>{

}
