import { Input, Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnChanges {
  @Input({ required: true }) src!: string;
  @Input() alt = 'Avatar';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fallback = 'assets/avatar_01.png';
  currentSrc!: string;

  ngOnChanges(): void {
    this.currentSrc = this.src;
  }

  onError() {
    this.currentSrc = this.fallback;
  }
}
