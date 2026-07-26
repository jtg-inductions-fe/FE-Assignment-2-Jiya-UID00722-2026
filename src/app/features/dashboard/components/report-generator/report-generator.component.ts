import { Component } from '@angular/core';
import * as Button from '@shared/button/button.types';
@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.scss'],
})
export class ReportGeneratorComponent {
  readonly Button = Button;
}
