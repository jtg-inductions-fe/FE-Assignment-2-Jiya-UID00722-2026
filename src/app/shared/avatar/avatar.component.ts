import { Input, Component, OnChanges } from '@angular/core';
import { ASSETS } from '@core/constants/assets';
import { AavatarSize } from './avatar.type';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnChanges {
  @Input({ required: true }) src!: string;
  @Input() alt = 'Avatar';
  @Input() size = AavatarSize.md;
  @Input() fallback = ASSETS.IMAGES.AVATAR;
  currentSrc!: string;

  ngOnChanges(): void {
    this.currentSrc = this.src;
  }

  onError() {
    this.currentSrc = this.fallback;
  }
}
