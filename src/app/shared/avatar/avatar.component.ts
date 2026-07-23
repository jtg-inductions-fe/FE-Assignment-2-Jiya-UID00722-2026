import { Input, Component, OnChanges } from '@angular/core';
import { AssetPaths } from '@core/constants/assets';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnChanges {
  @Input({ required: true }) src!: string;
  @Input() alt = 'Avatar';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fallback = AssetPaths.images.AVATAR;
  currentSrc!: string;

  ngOnChanges(): void {
    this.currentSrc = this.src;
  }

  onError() {
    this.currentSrc = this.fallback;
  }
}
