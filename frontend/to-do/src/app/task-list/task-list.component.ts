import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import Task from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(weekIndex?: number) {
    this.taskService.getTasks(weekIndex).subscribe(
      (tasks) => {
        this.tasks = tasks;
        console.log('Tasks fetched successfully:', tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
}
