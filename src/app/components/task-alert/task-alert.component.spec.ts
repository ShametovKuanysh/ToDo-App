import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAlertComponent } from './task-alert.component';

describe('TaskAlertComponent', () => {
  let component: TaskAlertComponent;
  let fixture: ComponentFixture<TaskAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
