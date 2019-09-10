import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSrc'
})
export class ImageSrcPipe implements PipeTransform {

  transform(photo: any): string {
    const imageFormat = photo.imageFormat || photo.image.imageFormat || 'image/jpeg';
    return 'data:' + imageFormat + ';base64,' + photo.file;  }
}
