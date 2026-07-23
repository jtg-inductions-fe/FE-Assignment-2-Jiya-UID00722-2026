import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-email-chip-input',
  templateUrl: './input-email-chips.component.html',
})
export class InputEmailChipsComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint?: string;
  @Input({ required: true })
  control!: FormControl<string[]>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addOnBlur = true;

  emailControl = new FormControl('', [Validators.email]);

  get emails(): string[] {
    return this.control.value ?? [];
  }

  add(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (!value) {
      event.chipInput?.clear();
      return;
    }

    this.emailControl.setValue(value);
    this.emailControl.markAsTouched();

    if (this.emailControl.invalid) {
      event.chipInput?.clear();
      return;
    }

    if (!this.emails.includes(value)) {
      this.control.setValue([...this.emails, value]);

      this.control.markAsDirty();
    }

    this.emailControl.reset();

    event.chipInput?.clear();
  }

  remove(index: number): void {
    const updated = [...this.emails];

    updated.splice(index, 1);

    this.control.setValue(updated);
    this.control.markAsDirty();
  }

  edit(index: number, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if (!value) {
      this.remove(index);
      return;
    }

    const emailControl = new FormControl(value, Validators.email);

    if (emailControl.valid) {
      const updated = [...this.emails];

      updated[index] = value;

      this.control.setValue(updated);
      this.control.markAsDirty();
    }
  }
}
