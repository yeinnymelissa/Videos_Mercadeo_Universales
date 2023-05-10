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
public class VideoService {
	@Autowired
	NamedParameterJdbcTemplate npjt;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public List<Map<String, Object>> obtenerPorAgrupador(Integer val){
		String query = "SELECT * FROM VIDEO WHERE ID_AGRUPADOR_VIDEO = :val ORDER BY GRABACION_FECHA DESC";
		
		SqlParameterSource sps = new MapSqlParameterSource()
				.addValue("val", val);
		
		return npjt.queryForList(query, sps);
	}

}
