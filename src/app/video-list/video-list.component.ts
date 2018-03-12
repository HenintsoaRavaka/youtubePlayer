import { Component, OnInit, EventEmitter} from '@angular/core';
import { Video } from './../video';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs: ['SelectVideo','SelectVideo_modif']
})
export class VideoListComponent implements OnInit {

	public SelectVideo = new EventEmitter();
  public SelectVideo_modif = new EventEmitter();

  constructor(private draguleService: DragulaService) { 
    /*draguleService.setOptions('bag-task1',{
          copy: true
    });*/
  }

  ngOnInit() {
  }

  onSelect(vid: Video){ 
  	this.SelectVideo.emit(vid);
  }

  modif(vid: Video){
    console.log("modif");
    this.SelectVideo_modif.emit(vid);
  }

}
