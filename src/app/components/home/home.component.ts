import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Logout } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public constructor() {}

  todoList: string[] = [
    "NGRX Demo app",
    "Shopping",
    "Call parents",
    "Sleep before 12",
  ]
  
  ngOnInit() {}

}
