import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input({ required: true }) src!: string;
  @Input() alt = 'Avatar';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
