import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {


  @Output()
  file: File;
  isHovering: boolean;

  constructor() { }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }


  startUpload(event: FileList): void {

    const file = event.item(0);

    if (file.type.split('/')[0] === 'image') {
      this.file = file;
      }
    }
}
