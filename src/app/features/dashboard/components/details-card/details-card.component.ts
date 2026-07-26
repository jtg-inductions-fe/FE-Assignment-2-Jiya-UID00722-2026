import { Component, Input } from '@angular/core';
import { DetailsCardItem } from '@core/models/dashboard.model';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
})
export class DetailsCardComponent {
  @Input({ required: true }) details: DetailsCardItem[] = [];
  @Input() label = '';
}
