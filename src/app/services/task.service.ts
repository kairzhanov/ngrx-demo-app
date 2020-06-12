import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${environment.apiUrl}/tasks`);
  }

  createTask(name: string, is_done: boolean): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/create-task`, { name: name, is_done: is_done });
  }
}
