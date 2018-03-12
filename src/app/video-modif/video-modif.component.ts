import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from './../video.service';

@Component({
  selector: 'video-modif',
  templateUrl: './video-modif.component.html',
  styleUrls: ['./video-modif.component.css'],
  inputs: ['video'],
  providers: [VideoService]
})
export class VideoModifComponent implements OnInit {

	private editTitle: boolean = false;

    video: Video;
    videos: Array<Video>;

    title: string;
    url: string;
    _id: string;

  	constructor(private _videoService: VideoService) { }

  	ngOnInit() {
  	}

  	onTitleClick(){
  		this.editTitle = true;
  	}

    public updateVideo() {
      console.log('updateVideocopm');
      const newVideo = {
        _id: '5aa574b9f5f6ca0d54dba4c6',
        title: 'test_title',
        url: 'test_url'
      }
      this._videoService.updateVideos(newVideo)
      .subscribe(/*resVideoData => { this.videos.push(resVideoData); }*/);
    }
}
