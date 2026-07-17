import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

export type ButtonVariant =
  'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'basic';
  @Input() color: 'primary' | 'accent' | 'warn' | null = null;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() icon: string | null = null;
  @Input() iconPosition: 'prefix' | 'suffix' = 'prefix';
  @Input() label: string | null = null;

  @Output() btnClick = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {}

  get buttonClasses(): { [key: string]: boolean } {
    return {
      'mat-mdc-button': this.variant === 'basic',
      'mat-mdc-raised-button': this.variant === 'raised',
      'mat-mdc-unelevated-button': this.variant === 'flat',
      'mat-mdc-outlined-button': this.variant === 'stroked',
      'mat-mdc-icon-button': this.variant === 'icon',
      'mat-mdc-fab': this.variant === 'fab',
      'mat-mdc-mini-fab': this.variant === 'mini-fab',
      [this.el.nativeElement.className]: true,
    };
  }

  onButtonClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
