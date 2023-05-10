package com.universales.videoapi.ws;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import com.universales.videoapi.dto.VideoTagDto;
import com.universales.videoapi.entity.Video;
import com.universales.videoapi.entity.VideoTag;
import com.universales.videoapi.impl.VideoTagServiceInterface;
import com.universales.videoapi.repository.VideoRepository;
import com.universales.videoapi.repository.VideoTagRepository;
import com.universales.videoapi.service.VideoTagService;

@Component
public class VideoTagsWS implements VideoTagServiceInterface{
	
	@Autowired
	VideoTagRepository vtr;
	
	@Autowired
	VideoRepository vr;
	
	@Autowired
	VideoTagService vts;
	
	@Override
	public List<Video> obtenerVideos(@PathVariable("tag") String tag) {
		List<VideoTag> listTag = vtr.obtenerPorTag(tag);
		
		List<Video> listVideo = new ArrayList<>();
		
		for (VideoTag tagtmp : listTag) {
			
			Optional<Video> opvid = vr.findById(tagtmp.getIdVideo());
			if(opvid.isPresent()) {
				listVideo.add(opvid.get());
			}
		}
		
		return listVideo;
	}

	@Override
	public void guardarVideo(VideoTagDto tag) {
		VideoTag vidTag = new VideoTag();
		
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
		List<VideoTag> listTagsVideo = vtr.findByIdVideo(id);
		List<String> listTag = new ArrayList<>();
		for (VideoTag videoTag : listTagsVideo) {
			listTag.add(videoTag.getNombreTag());
		}
		return listTag;
	}

}
