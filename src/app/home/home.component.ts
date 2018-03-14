import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './../utility.service';
import { VideoService } from './../video.service';
import { Video } from './../video';
import { SpinnerService } from 'angular-spinners';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UtilityService,VideoService]
})
export class HomeComponent implements OnInit {
  
    video: Video;
    videos: Array<Video>;
    title: String;
    url: String;
    description: String;

    showSpinner: boolean = true;

    selectedVideo: Video;

   	constructor(
	    private router: Router,
      private _videoService: VideoService
  	) {
        
     }

  	ngOnInit() {
      this._videoService.getVideos()
      .subscribe(resVideoData => 
        this.videos = resVideoData
      );
  	}

    public onSelectVideo(video:any){
      this.selectedVideo = video;
      console.log(this.selectedVideo);
    }

    public addPlayList(video:any){
      console.log("addplaylist");
      const newVideo = {
        title: this.title,
        url: this.url,
        description: this.description
      }
      this._videoService.insertVideos(newVideo)
      .subscribe(resVideoData => { this.videos.push(resVideoData); });
    }

    recherche_video(e){
      e.preventDefault();
      const video_parm = {
        title: this.title
      }
      this._videoService.findVideos(video_parm)
      .subscribe(resVideoData => this.videos = resVideoData);
    }
}
