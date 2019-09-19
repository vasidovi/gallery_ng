import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase'
})
export class FirstLetterUppercasePipe implements PipeTransform {

  transform(value: string): string {

    if (value === null) {
    } else if (!value) {
      return '';
    }

    let result = value.charAt(0).toUpperCase() + value.slice(1);
    let isNextUppercase = false;

    const isSentenceEnd = /[.!?]/;
    const isLetter = /[a-zA-Z]/;

    for (let i = 1; i < value.length; i++) {

      if (isSentenceEnd.test(value[i])) {
        isNextUppercase = true;
      } else if (isNextUppercase && isLetter.test(value[i])){
         result = result.slice(0, i) + result.charAt(i).toUpperCase() + result.slice(i + 1);
         isNextUppercase = false;
      }
    }

    return result;
  }
}
