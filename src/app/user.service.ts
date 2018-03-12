import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

	private _getUrl = "/api/videos";
  	constructor(private _http: Http) { }

  	

}
