import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Task from './task.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(weekIndex?: number): Observable<Task[]> {
    // const params = weekIndex !== undefined ? { weekIndex } : {};
    const url = this.apiUrl + '/';
    const options = weekIndex
      ? { params: new HttpParams().set('weekIndex', weekIndex) }
      : {};

    return this.http.get<Task[]>(url, options).pipe(
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        throw error; // Rethrow the error after logging it
      })
    );
  }
}
