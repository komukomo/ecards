import { Component, OnInit } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import { environment } from 'environments/environment';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  private uploadUrl = environment.production ? 'api/cards/upload' :
      'http://localhost:3000/api/cards/upload';

  constructor(private http: Http) { }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new Headers();
      headers.append('Accept', 'text/plain');
      this.http.post(`${this.uploadUrl}`, formData, {headers: headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError)
    }
  }

  // TODO
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.messsage || error);
  }
}
