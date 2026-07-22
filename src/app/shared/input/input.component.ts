import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputAppearace, InputType } from './input.types';
import * as Button from '@shared/button/button.types';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  readonly Button = Button;

  @Input({ required: true }) control!: FormControl;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = InputType.text;
  @Input() appearance: InputAppearace = InputAppearace.outline;
  @Input() hint?: string;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() readonly = false;

  hidePassword = true;

  get showError(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  get errorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    const errors = this.control.errors;

    if (!errors) return '';

    switch (true) {
      case 'required' in errors:
        return `${this.label || 'Field'} is required`;

      case 'email' in errors:
        return 'Please enter a valid email address';

      case 'minlength' in errors:
        return `Minimum ${errors['minlength'].requiredLength} characters required`;

      case 'maxlength' in errors:
        return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;

      case 'pattern' in errors:
        return 'Invalid format';

      default:
        return 'Invalid value';
    }
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }
}
