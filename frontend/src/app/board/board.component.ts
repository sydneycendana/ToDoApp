import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayColumnComponent } from '../day-column/day-column.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DayColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  daysOfWeek: Date[] = [];

  ngOnInit(): void {
    // this.initializeDaysOfWeek();
    // this.loadTasksForCurrentWeek();
  }

  constructor() {
    // Initialize the daysOfWeek array with dates for Monday to Sunday of the current week
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysUntilMonday);

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.daysOfWeek.push(day);
    }
  }

  getTasksForDay(day: Date): string[] {
    return [];
  }
}
