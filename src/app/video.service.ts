import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {

	private _getUrl = "/api/videos";
  private _getUrl_find_video = "/api/find_video";
  private _getUrl_find_video_youtube = "/api/find_video_youtube";
  private _getUrl_upd_video = "/api/update";
  

  constructor(private _http: Http) { }

  	public getVideos(){
  		return this._http.get(this._getUrl)
  		.map((response: Response) => response.json());
    }

    public findVideos(param){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this._getUrl_find_video, param, {headers:headers}).map(res => res.json());
    }

    public findVideos_youtube(param){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this._getUrl_find_video_youtube, param, {headers:headers}).map(res => res.json());
    }

    public insertVideos(newVideo) {
    	console.log('insertVideos');
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	return this._http.post(this._getUrl, newVideo, {headers:headers}).map(res => res.json());
    }

    public updateVideos(newVideo) {
      console.log('updateVideos'+newVideo);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this._getUrl_upd_video, newVideo, {headers:headers}).map(res => res.json());
    }

}
