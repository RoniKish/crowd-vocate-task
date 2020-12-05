import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public tasks: string[] = [];
  constructor(private httpClient: HttpClient) {
  }

  public task(): void {
    this.httpClient.get('http://localhost:8080/api/task')
      .subscribe((tasks: string[]) => this.tasks = tasks);
  }
}
