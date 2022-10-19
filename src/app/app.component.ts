import { Component, OnInit } from '@angular/core';
import { TodoserviceService } from './services/todoservice.service';
import { PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  priority: number;
  status?: "notstarted" | "started" | "finished";
  date?: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {

  tasks: Array<TaskProps> = [];
  tasksNotStarted: Array<TaskProps> = [];
  tasksStarted: Array<TaskProps> = [];
  tasksCompleted: Array<TaskProps> = [];
  $event: any;
  displayModal!: boolean;
  displayBasic!: boolean;
  displayBasic2!: boolean;
  displayMaximizable!: boolean;
  displayPosition!: boolean;
  position!: string;
  showCreateTaskModal: boolean = true;

  taskToModify: any;



  constructor(private todoserviceService: TodoserviceService, private primengConfig: PrimeNGConfig) {
    this.refetchData();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  refetchData() {
    this.todoserviceService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
      this.tasksNotStarted = this.tasks.filter((task: TaskProps) => task.status !== "started" && task.status !== "finished").sort((a, b) => b.priority - a.priority);
      this.tasksStarted = this.tasks.filter((task: TaskProps) => task.status === "started").sort((a, b) => b.priority - a.priority);
      this.tasksCompleted = this.tasks.filter((task: TaskProps) => task.status === "finished").sort((a, b) => b.priority - a.priority);
    });
  }

  onDeleteTask(idToDelete: number) {
    let serverStarted = false;
    this.todoserviceService.deleteTask(idToDelete).subscribe((data: any) => {
      serverStarted = true;
    });
    this.refetchData();
    alert("Task deleted Sucessfully");
    window.location.reload();
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  drag(event: any) {
    event.dataTransfer.setData("data", event.target.id);
  }

  drop(event: any, element: any) {
    event.preventDefault();
    let data = event.dataTransfer.getData("data");
    element.appendChild(document.getElementById(data));

    //Update Task
    const statusToUpdate = element.dataset.action;
    const taskToUpdate = this.tasks.find((task: TaskProps) => task.id === parseInt(data));
    this.todoserviceService
      .updateTask(parseInt(data), { ...taskToUpdate, status: statusToUpdate })
      .subscribe((data: any) => {
        this.refetchData();
      }
      );
  }


  showModalDialog() {
    this.displayModal = true;
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  onSubmitCreate(userForm: NgForm) {
    const data = userForm.value;
    const finalData = { ...data, status: "notstarted", priority: data.priority != 1 || data.priority != 2 || data.priority != 3 ? 1 : data.priority };

    this.todoserviceService.createTask(finalData).subscribe((data: any) => {
      this.refetchData();
      alert("Task added Sucessfully");
      window.location.reload();
      this.displayModal = false;
    });
  }

  onSubmitModify(userForm: NgForm) {
    const data = userForm.value;
    const finalData = {
      title: data.title || this.taskToModify.title,
      description: data.description || this.taskToModify.description,
      priority: data.priority || this.taskToModify.priority,
      status: data.status || this.taskToModify.status,
      date: data.date || this.taskToModify.date
    }
    this.todoserviceService.updateTask(this.taskToModify.id, finalData).subscribe((data: any) => {
      this.refetchData();
      alert("Task updated Sucessfully");
      window.location.reload();
      this.displayModal = false;
    }
    );
  }
  onCreateTask() {
    this.showCreateTaskModal = true;
    this.showModalDialog();
  }

  onModifyTask(taskId: number) {
    this.taskToModify = this.tasks.find((task: TaskProps) => task.id === taskId);
    this.showCreateTaskModal = false;
    console.log(this.taskToModify);
    this.showModalDialog();
  }

}
