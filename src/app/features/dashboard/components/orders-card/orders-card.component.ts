import { Input, Component, Output, EventEmitter } from '@angular/core';
import { Order, Status } from '@core/models/dashboard.model';
import { ORDER_TABLE_COLUMNS } from '@core/constants/dashboard';
import * as Button from '@shared/components/button/button.types';

@Component({
  selector: 'app-orders-card',
  templateUrl: './orders-card.component.html',
  styleUrls: ['./orders-card.component.scss'],
})
export class OrdersCardComponent {
  @Input({ required: true })
  orders: Order[] = [];

  @Output()
  orderAccepted = new EventEmitter<Order>();

  @Output()
  orderRejected = new EventEmitter<Order>();

  @Output()
  orderCompleted = new EventEmitter<Order>();

  readonly Button = Button;
  readonly Status = Status;

  readonly displayedColumns = ORDER_TABLE_COLUMNS;

  accept(order: Order): void {
    this.orderAccepted.emit(order);
  }

  reject(order: Order): void {
    this.orderRejected.emit(order);
  }

  complete(order: Order): void {
    this.orderCompleted.emit(order);
  }
}
