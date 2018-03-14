import { Video } from './../video';
import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService,UtilityService]
})
export class VideoCenterComponent implements OnInit {
  
  video: Video;
  title:string;
  url:string;
  description:string;

  videos: Array<Video>;
  video_youtubes: Array<Video>;

	selectedVideo: Video;
	
  constructor(private _videoService: VideoService, private utility: UtilityService, private router: Router,) { }

  ngOnInit() {
    this.utility.isLogged().then((result: boolean) => {
      if(!result){
        this.router.navigate(['login']);
      }
    });
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

  recherche_video_youtube(e){
    e.preventDefault();
    const video_parm = {
      title: this.title
    }
    this._videoService.findVideos_youtube(video_parm)
    .subscribe(resVideoData => this.video_youtubes = resVideoData);
  }

  public addPlayList(video:any){
    console.log("addplaylist");
    /*const newVideo = {
      title: this.title,
      url: this.url,
      description: this.description
    }
    this._videoService.insertVideos(newVideo)
    .subscribe(resVideoData => { this.videos.push(resVideoData); });*/
  }

}
