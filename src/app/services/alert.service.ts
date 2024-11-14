import { Injectable } from '@angular/core';
import { Alert, NotificationType } from '../models/alert.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private notificationsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  public notifications$: Observable<Alert[]> = this.notificationsSubject.asObservable();

  addNotification(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    const id = Date.now(); // Уникальный ID уведомления
    const newNotification: Alert = { id, message, type };
    const currentNotifications = this.notificationsSubject.getValue();

    this.notificationsSubject.next([...currentNotifications, newNotification]);

    // Удаление уведомления по истечении времени
    setTimeout(() => this.removeNotification(id), duration);
  }

  removeNotification(id: number): void {
    const updatedNotifications = this.notificationsSubject.getValue().filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }
}
