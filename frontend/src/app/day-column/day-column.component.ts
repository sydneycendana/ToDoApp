import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';

@Component({
  selector: 'app-day-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-column.component.html',
  styleUrl: './day-column.component.css',
})
export class DayColumnComponent {
  @Input() day: Date | undefined;
  // Add an input property for tasks associated with the day
  @Input() tasks: Task[] = [];

  constructor() {}
}
