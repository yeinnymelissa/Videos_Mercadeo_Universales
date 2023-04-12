package com.universales.videoapi.ws;

import java.util.ArrayList;
import java.util.List;
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

@Component
public class VideoTagsWS implements VideoTagServiceInterface{
	
	@Autowired
	VideoTagRepository vtr;
	
	@Autowired
	VideoRepository vr;
	
	@Override
	public List<Video> obtenerVideos(@PathVariable("tag") String tag) {
		List<VideoTag> listTag = vtr.findByNombreTagContainingIgnoreCase(tag);
		
		List<Video> listVideo = new ArrayList<>();
		
		for (VideoTag tags : listTag) {
			boolean find = false;
			for (Video video : listVideo) {
				if(video.getIdVideo() == tags.getIdVideo()) {
					find = true;
				}
			}
			
			if(!find) {
				Optional<Video> opvid = vr.findById(tags.getIdVideo());
				if(opvid.isPresent()) {
					listVideo.add(opvid.get());
				}
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

}
