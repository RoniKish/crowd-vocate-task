import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl: string = 'http://localhost:5000/'

  constructor(private http: HttpClient) { }

  createTask(task) {
    return this.http.post(this.baseUrl + "task", task);
  }

  getAllTasks() {
    return this.http.get(this.baseUrl + "task");
  }

  getTask(id) {
    return this.http.get(this.baseUrl + "task/" + id);
  }

  deleteTask(id) {
    return this.http.delete(this.baseUrl + "task/" + id);
  }

  updateTask(id, newTask) {
    return this.http.put(this.baseUrl + "task/" + id, newTask);
  }

}
