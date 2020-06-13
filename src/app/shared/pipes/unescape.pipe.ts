import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unescape'
})
export class UnescapePipe implements PipeTransform {

  transform(asciiEmoji: string): string {
    return unescape(asciiEmoji);
  }

}
