import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import * as ButtonTypes from '@shared/button/button.types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant = ButtonTypes.ButtonVariant.basic;
  @Input() type = ButtonTypes.ButtonType.button;
  @Input() disabled = false;
  @Input() iconPosition = ButtonTypes.IconPosition.prefix;
  @Input() iconSize = ButtonTypes.IconSize.md;
  @Input() color?: ButtonTypes.ButtonColor;
  @Input() icon?: string;
  @Input() label?: string;
  @Input() buttonClass = '';

  @Output() btnClick = new EventEmitter<MouseEvent>();

  readonly ButtonTypes = ButtonTypes;

  constructor(private el: ElementRef) {}

  onButtonClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
