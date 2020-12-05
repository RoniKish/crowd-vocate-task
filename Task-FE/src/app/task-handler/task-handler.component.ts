import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../interfaces/Task';
import { TasksService } from '../tasks.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';


@Component({
  selector: 'app-task-handler',
  templateUrl: './task-handler.component.html',
  styleUrls: ['./task-handler.component.less']
})

export class TaskHandlerComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'description', 'status', 'startDate', 'endDate', 'actions'];
  tasks = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getAllTasksFromDb()
  }

  ngAfterViewInit() {
    this.tasks.paginator = this.paginator;
  }

  addNewTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var resultObj = JSON.parse(String(result));
        const newData = this.tasks.data;
        newData.push(new Task(resultObj._id, resultObj.name, resultObj.description, resultObj.status, resultObj.startDate, resultObj.endDate));
        this.tasks.data = newData;
      }
    });
  }

  getAllTasksFromDb() {
    this.tasksService.getAllTasks().subscribe((data)=>{
      if (data != 'failed') {
        this.tasks.data = JSON.parse(String(data));
      }
    })
  }

  deleteTask(taskId, taskIndex) {
    this.tasksService.deleteTask(taskId['$oid']).subscribe((data)=>{
      if (data) {
        const newData = this.tasks.data;
        newData.splice(taskIndex, 1)
        this.tasks.data = newData;      }
    })
  }

  updateTask(task, taskIndex) {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: task
     });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newData = this.tasks.data;
        newData[taskIndex] = result
        this.tasks.data = newData; 
      }
    });
  }

}
