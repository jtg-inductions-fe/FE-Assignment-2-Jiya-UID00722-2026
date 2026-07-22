import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import {
  ButtonColor,
  ButtonType,
  ButtonVariant,
  IconPosition,
} from './button.types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = ButtonVariant.basic;
  @Input() color?: ButtonColor;
  @Input() type: ButtonType = ButtonType.button;
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() iconPosition: IconPosition = IconPosition.prefix;
  @Input() label?: string;

  @Output() btnClick = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {}

  get buttonClasses(): { [key: string]: boolean } {
    return {
      [this.el.nativeElement.className]: true,
    };
  }

  onButtonClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
