import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../interfaces/Task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.less']
})
export class UpdateTaskComponent implements OnInit{

  newStartDate: Date;
  newEndDate: Date;

  taskStatus: string[] = [
    "To do",
    "In progress",
    "Done"
  ]

  constructor(private dialogRef: MatDialogRef<UpdateTaskComponent>,
              private tasksService: TasksService,
              @Inject(MAT_DIALOG_DATA) public taskToUpdate: Task) { }
     
  ngOnInit() {
    this.newStartDate = new Date(this.taskToUpdate.startDate);
    this.newEndDate = new Date(this.taskToUpdate.endDate);
  }

  submitForm() {
    var taskId = this.taskToUpdate._id['$oid']
    this.taskToUpdate.startDate = formatDate(this.newStartDate, 'MM-dd-yyyy', "en-GB");
    this.taskToUpdate.endDate = formatDate(this.newEndDate, 'MM-dd-yyyy', "en-GB");
    this.tasksService.updateTask(taskId, this.taskToUpdate).subscribe((data)=>{
      if (data) {
        this.dialogRef.close(this.taskToUpdate);
      }
      else {
        this.dialogRef.close();
      }
    })
  }

  close(){
    this.dialogRef.close();
  }
}
