import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(avatar: string): unknown {
    return avatar === 'default_avatar' ? '../../../assets/icons/default-avatar.png' : avatar;
  }
}
