import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; // ✅ імпорт лише потрібної директиви
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, TaskListComponent, TaskFormComponent], // ✅ тут
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Task Management System';
  selectedTask?: Task;

  constructor(
    private taskService: TaskService,
    public authService: AuthService
  ) {}

  onEditTask(task: Task): void {
    this.selectedTask = task;
  }

  onTaskUpdated(): void {
    this.selectedTask = undefined;
  }

  exportTasks(): void {
    this.taskService.exportTasksToCSV();
  }

  login(email: string, password: string): void {
    this.authService.login(email, password);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
