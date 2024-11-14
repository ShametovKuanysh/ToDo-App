import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { map, Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import {MatButtonModule} from '@angular/material/button';
import { TaskItemComponent } from "../task-item/task-item.component";
import {MatIconModule} from '@angular/material/icon';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TaskItemComponent,MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  filteredTasks$!: Observable<Task[]>;
  filterStatus: 'all' | 'active' | 'completed' = 'all';
  sortStatus: 'desc' | 'asc' | 'no' = 'no'

  dialog = inject(MatDialog);

  constructor(private tasksService: TaskService,
              private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$
    this.applyFilter();
  }

  addTask(){
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {},
    });

    dialogRef.componentInstance.save.subscribe((task: Task) => {
      this.tasksService.addTask(task);
      this.alertService.addNotification('Task added successfully','success')
      dialogRef.close();
    });

    dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  editTask(task: Task){
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {task},
    });

    dialogRef.componentInstance.save.subscribe((task: Task) => {
      this.tasksService.editTask(task);
      this.alertService.addNotification('Task edited','success')
      dialogRef.close();
    });

    dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  deleteTask(task: Task){
    this.tasksService.deleteTask(task.id);
    this.alertService.addNotification('Task deleted','warning')
  }

  completeTask(task: Task){
    this.tasksService.editTask(task);
    this.alertService.addNotification(task.completed ? 'Task completed' : 'Task status changed','info')
  }

  setFilter(status: 'all' | 'active' | 'completed') {
    this.filterStatus = status;
    this.applyFilter();
  }

  setSort(status: 'desc' | 'asc' | 'no'){
    this.sortStatus = status;
    this.applySort();
  }

  applySort(){
    this.filteredTasks$ = this.filteredTasks$.pipe(
      map(tasks => {
        switch (this.sortStatus) {
          case 'desc':
            return tasks.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          case 'asc':
            return tasks.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
          default:
            return tasks;
        }
      })
    )
  }

  applyFilter() {
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => {
        switch (this.filterStatus) {
          case 'active':
            return tasks.filter(task => !task.completed);
          case 'completed':
            return tasks.filter(task => task.completed);
          default:
            return tasks;
        }
      })
    );
  }
}
