import { Component } from '@angular/core';
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskAlertComponent } from "./components/task-alert/task-alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoapp';
}
