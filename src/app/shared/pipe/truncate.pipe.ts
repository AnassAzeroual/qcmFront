import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    // if (completeWords) {
    //   limit = value.substring(0, limit).lastIndexOf(' ');
    //   if (limit == -1) {
    //     let length_of_first_value = value.length
    //     limit = value.substring(0, length_of_first_value).length
    //   }
    //   console.log(limit);
    // }
    // return value.length > limit ? value.substring(0, limit) + ellipsis : value;

    if (!value)
      return value;

    let truncatedString = value.substring(0, limit);

    if (completeWords) {
      if (limit < value.length) {
        let ndxOfFirstSpace = value.substring(limit).indexOf(' ')
        if (ndxOfFirstSpace == -1) {
          truncatedString = value;
        }
        else {
          truncatedString = truncatedString + value.substring(limit, limit + ndxOfFirstSpace);
        }
      }
    }

    return truncatedString;

  }
}