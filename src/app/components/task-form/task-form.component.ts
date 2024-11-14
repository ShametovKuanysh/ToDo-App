import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Task } from '../../models/task.model';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<Task> = new EventEmitter();

  isEditing: boolean = false;
  taskForm!: FormGroup
  task!: Task
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {task: Task}){
    this.task = data?.task
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      created_at: new Date(),
      updated_at: new Date(),
      completed: false,
      completed_at: null,
      id: ''
    })
    if(this.task){
      this.taskForm.patchValue(this.task);
      this.isEditing = true;
    }
  }

  close(){
    this.cancel.emit();
  }

  submit(){
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        ...this.task,
        title: formValue.title,
        description: formValue.description,
        completed: this.task ? this.task.completed : false,
        id: this.task ? this.task.id : ''
      };
      this.save.emit(task);
    }
  }
  
}
