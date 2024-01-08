import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayColumnComponent } from '../day-column/day-column.component';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DayColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  daysOfWeek: Date[] = [];
  tasks: Task[] = [];

  ngOnInit(): void {
    this.initializeDaysOfWeek();
    // this.loadTasksForCurrentWeek();
  }

  constructor() {}

  getTasksForDay(day: Date): Task[] {
    return [];
  }

  private initializeDaysOfWeek(): void {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysUntilMonday);

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.daysOfWeek.push(day);
    }
  }

  // loadTasksForCurrentWeek(): void {
  //   this.taskService.getAllTasks().subscribe((tasks) => {
  //     this.tasks = tasks;
  //   });
  // }
}
