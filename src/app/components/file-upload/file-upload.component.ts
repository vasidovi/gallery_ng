import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {


  @Output()
  // fileEmiter = new EventEmitter<File>();
  file: File;
  isHovering: boolean;

  constructor() { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {

    const file = event.item(0);

    if (file.type.split('/')[0] === 'image') {
      this.file = file;
      // this.fileEmiter.emit(file);
      }
    }
}
