import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  public baseUrl = 'https://novatodoapi.azurewebsites.net/task';

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(this.baseUrl);
  }

  getTask(taskId: number) {
    return this.http.get(`${this.baseUrl}/${taskId}`);
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.baseUrl}/${taskId}`);
  }

  updateTask(taskId: number, task: any) {
    return this.http.put(`${this.baseUrl}/${taskId}`, task);
  }

  createTask(task: any) {
    return this.http.post(this.baseUrl, task);
  }




}//Class TodoserviceService
