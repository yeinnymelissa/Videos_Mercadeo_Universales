package com.universales.apiwebinars.ws;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import com.universales.apiwebinars.dto.VideoTagDto;
import com.universales.apiwebinars.entity.WebinarsVideo;
import com.universales.apiwebinars.entity.WebinarsVideoTag;
import com.universales.apiwebinars.impl.VideoTagServiceInterface;
import com.universales.apiwebinars.repository.WebinarsVideoRepository;
import com.universales.apiwebinars.repository.WebinarsVideoTagRepository;
import com.universales.apiwebinars.service.VideoTagService;

@Component
public class VideoTagsWS implements VideoTagServiceInterface{
	
	@Autowired
	WebinarsVideoTagRepository vtr;
	
	@Autowired
	WebinarsVideoRepository vr;
	
	@Autowired
	VideoTagService vts;
	
	@Override
	public List<WebinarsVideo> obtenerVideos(@PathVariable("tag") String tag) {
		List<WebinarsVideoTag> listTag = vtr.obtenerPorTag(tag);
		
		List<WebinarsVideo> listVideo = new ArrayList<>();
		
		for (WebinarsVideoTag tagtmp : listTag) {
			
			Optional<WebinarsVideo> opvid = vr.findById(tagtmp.getIdVideo());
			if(opvid.isPresent()) {
				listVideo.add(opvid.get());
			}
		}
		
		return listVideo;
	}

	@Override
	public void guardarVideo(VideoTagDto tag) {
		WebinarsVideoTag vidTag = new WebinarsVideoTag();
		
		vidTag.setId(tag.getId());
		vidTag.setIdVideo(tag.getIdVideo());
		vidTag.setNombreTag(tag.getNombreTag());
		
		vtr.save(vidTag);
		
	}

	@Override
	public List<Map<String, Object>> obtenerVideos2(String tag) {
		return vts.obtenerPorTag(tag);
	}

	@Override
	public List<String> obtenerVideosId(int id) {
		List<WebinarsVideoTag> listTagsVideo = vtr.findByIdVideo(id);
		List<String> listTag = new ArrayList<>();
		for (WebinarsVideoTag webinarsVideoTag : listTagsVideo) {
			listTag.add(webinarsVideoTag.getNombreTag());
		}
		return listTag;
	}

}
