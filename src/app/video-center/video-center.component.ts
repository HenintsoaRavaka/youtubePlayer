import { Video } from './../video';
import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {
  
  video: Video;
  title:string;
  url:string;
  description:string;

	videos: Array<Video>;

	selectedVideo: Video;
	
  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  	
  }

  public onSelectVideo(video:any){
  	this.selectedVideo = video;
  	console.log(this.selectedVideo);
  }

  public createVideo() {
    const newVideo = {
      title: this.title,
      url: this.url,
      description: this.description
    }
    this._videoService.insertVideos(newVideo)
    .subscribe(resVideoData => { this.videos.push(resVideoData); });
  }
}
