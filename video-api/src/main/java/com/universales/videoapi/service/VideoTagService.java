package com.universales.videoapi.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

@Service
public class VideoTagService {
	@Autowired
	NamedParameterJdbcTemplate npjt;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public List<Map<String, Object>> obtenerPorTag(String val){
		String query = "SELECT * FROM VIDEO WHERE ID_VIDEO IN (SELECT DISTINCT ID_VIDEO FROM VIDEO_TAG WHERE upper(NOMBRE_TAG) LIKE upper('%'||:val||'%')) AND ESTADO = 'A' ORDER BY GRABACION_FECHA DESC";
		
		SqlParameterSource sps = new MapSqlParameterSource()
				.addValue("val", val);
		
		return npjt.queryForList(query, sps);
	}
	
	public void eliminarPorIdVideo(int val){
		String query = "DELETE FROM VIDEO_TAG WHERE ID_VIDEO = :val";
		
		SqlParameterSource sps = new MapSqlParameterSource()
				.addValue("val", val);
		
		npjt.update(query, sps);
	}

}
