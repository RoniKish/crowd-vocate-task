import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.less'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class AddTaskComponent {

  taskStatus: string[] = [
    "To do",
    "In progress",
    "Done"
  ]

  constructor(private dialogRef: MatDialogRef<AddTaskComponent>,
              private tasksService: TasksService) { }

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  })

  submitForm() {
    this.taskForm.value.startDate = formatDate(this.taskForm.value.startDate, 'MM-dd-yyyy', "en-GB");
    this.taskForm.value.endDate = formatDate(this.taskForm.value.endDate, 'MM-dd-yyyy', "en-GB");
    this.tasksService.createTask(this.taskForm.value).subscribe((data)=>{
      if (data != 'failed') {
        this.dialogRef.close(data);
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
