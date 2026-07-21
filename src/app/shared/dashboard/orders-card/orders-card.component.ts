import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Order, Status } from '@core/models/dashboard.model';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-orders-card',
  templateUrl: './orders-card.component.html',
  styleUrls: ['./orders-card.component.scss'],
})
export class OrdersCardComponent implements OnChanges {
  @Input({ required: true }) orders: Order[] = [];
  @Input() title = '';
  @Input() subtitle = '';

  readonly Button = Button;
  readonly Status = Status;

  displayedOrders: Order[] = [];

  displayedColumns: string[] = [
    'orderId',
    'restaurantName',
    'customerName',
    'items',
    'amount',
    'status',
    'actions',
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders']) {
      this.displayedOrders = [...this.orders];
    }
  }

  accept(order: Order): void {
    order.status = Status.Accepted;
  }

  reject(order: Order): void {
    order.status = Status.Rejected;
    this.removeOrder(order);
  }

  complete(order: Order): void {
    order.status = Status.Completed;
    this.removeOrder(order);
  }

  private removeOrder(order: Order): void {
    this.displayedOrders = this.displayedOrders.filter(
      o => o.orderId !== order.orderId,
    );
  }
}
