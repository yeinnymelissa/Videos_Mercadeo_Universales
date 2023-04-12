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
public class ContactoService {
	@Autowired
	NamedParameterJdbcTemplate npjt;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public List<Map<String, Object>> obtenerContacto(String val, String val2){
		String query = "SELECT * FROM DBASEGUNI.TCLAVES WHERE COLUMNA = :val AND CODIGO = :val2";
		
		SqlParameterSource sps = new MapSqlParameterSource()
				.addValue("val", val)
				.addValue("val2", val2);
		
		return npjt.queryForList(query, sps);
	}
	
	public void actualizarContacto(String val, String val2, String valor){
		String query = "UPDATE DBASEGUNI.TCLAVES SET DESCRIP=:valor WHERE COLUMNA = :val AND CODIGO = :val2";
		
		SqlParameterSource sps = new MapSqlParameterSource()
				.addValue("val", val)
				.addValue("val2", val2)
				.addValue("valor", valor);
		npjt.update(query, sps);
	}
}
