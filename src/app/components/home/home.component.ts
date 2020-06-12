import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState, selectTaskState } from 'src/app/store/app.states';
import { Logout } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { GetTasks, CreateTask, ToggleTask } from 'src/app/store/actions/task.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  getState: Observable<any>;
  taskForm: FormGroup;

  public constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
    ) {
    this.getState = this.store.select(selectTaskState);
    this.taskForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  // todoList: string[] = [
  //   "NGRX Demo app",
  //   "Shopping",
  //   "Call parents",
  //   "Sleep before 12",
  // ];
  
  tasks: Task[];

  ngOnInit() {
    const payload = {};
    this.store.dispatch(new GetTasks(payload));

    this.getState.subscribe((state) => {
      this.tasks = state.tasks;
    });
  }

  TaskToggle(event) {
    let id = event.target.value;
    // console.log(payload);
    this.store.dispatch(new ToggleTask(id));
    // console.log(event.target.value, event.target.checked);
  }

  CreateTask() {
    if (this.name.value ) {
      const payload = { name: this.name.value, is_done: false };
      this.store.dispatch(new CreateTask(payload));
      this.taskForm.reset();
    }
  }

  get name() {
    return this.taskForm.get('name');
  }

  ngOnDestroy() {
    // this.getState.unsubscribe();
}

}
