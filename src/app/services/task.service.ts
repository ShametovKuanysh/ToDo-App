import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable()

  constructor() { 
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    this.tasksSubject.next(savedTasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    task.id = uuid.v4()
    const newTasks = [...currentTasks, task];

    this.updateTasks(newTasks);
  }

  editTask(updatedTask: Task): void {
    const currentTasks = this.getTasks();
    const updatedTasks = currentTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.updateTasks(updatedTasks);
  }

  deleteTask(taskId: string): void {
    const currentTasks = this.getTasks();
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.updateTasks(updatedTasks);
  }


  private updateTasks(newTasks: Task[]): void {
    this.tasksSubject.next(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
}
