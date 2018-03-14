import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from './../video.service';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['video']
})
export class VideoDetailComponent implements OnInit {

  constructor() { }
  url: string;

  ngOnInit() {
    console.log(""+this.url);
  }
}
