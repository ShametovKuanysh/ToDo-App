import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox'
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatCheckboxModule, FormsModule, NgClass, NgIf],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task
  @Output() editTask: EventEmitter<Task> = new EventEmitter();
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() completeTask: EventEmitter<Task> = new EventEmitter();

  complete(e: MatCheckboxChange){
    this.task.completed = e.checked;
    this.task.completed_at = this.task.completed ? new Date() : null;
    this.task.updated_at = new Date();
    this.completeTask.emit(this.task);
  }

  edit(){
    this.editTask.emit(this.task);
  }

  delete(){
    this.deleteTask.emit(this.task);
  }
}
