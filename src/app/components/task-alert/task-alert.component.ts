import { Component, Input } from '@angular/core';
import { Alert } from '../../models/alert.model';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-alert.component.html',
  styleUrl: './task-alert.component.scss'
})
export class TaskAlertComponent {
  notifications: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  closeNotification(id: number): void {
    this.alertService.removeNotification(id);
  }
}
