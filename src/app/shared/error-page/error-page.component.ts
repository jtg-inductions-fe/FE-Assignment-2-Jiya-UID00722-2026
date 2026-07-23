import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  private router = inject(Router);
  readonly Button = Button;
  private route = inject(ActivatedRoute);

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imgUrl?: string;

  goBack(): void {
    this.router.navigateByUrl('');
  }
  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
    this.subtitle = this.route.snapshot.data['subtitle'];
    this.imgUrl = this.route.snapshot.data['imgUrl'];
  }
}
