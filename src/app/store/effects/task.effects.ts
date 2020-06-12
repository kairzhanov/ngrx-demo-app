import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';

import { TaskActionTypes, 
    GetTasks, GetTasksSuccess, GetTasksFailure, 
    CreateTask, CreateTaskSuccess, CreateTaskFailure } from '../actions/task.actions';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';



@Injectable()
export class TaskEffects {

    constructor(
        private actions$: Actions,
        private taskService: TaskService,
        private router: Router,
    ) {}

    @Effect()
    GetTask: Observable<any> = this.actions$.pipe(
        ofType(TaskActionTypes.GET_TASKS),
        map((action: GetTasks) => action.payload),
        switchMap(payload => {
            return this.taskService.getTasks().pipe(
                map((tasks: Task[]) => {
                    console.log(tasks);
                    return new GetTasksSuccess(tasks);
                }), catchError((error) => {
                    console.log(error);
                    return of(new GetTasksSuccess({ error: error }));
                }));
        })
    );
    

    @Effect({ dispatch: false })
    GetTaskSuccess: Observable<any> = this.actions$.pipe(
        ofType(TaskActionTypes.GET_TASKS_SUCCESS),
        tap((tasks) => {
            localStorage.setItem('tasks', tasks.payload);
            // this.router.navigateByUrl('/');
        })
    );
    
    @Effect({ dispatch: false })
    GetTaskFailure: Observable<any> = this.actions$.pipe(
    ofType(TaskActionTypes.GET_TASKS_FAILURE)
    );

    @Effect()
    CreateTask: Observable<any> = this.actions$.pipe(
        ofType(TaskActionTypes.CREATE_TASK),
        map((action: CreateTask) => action.payload),
        switchMap(payload => {
            return this.taskService.createTask(payload.name, payload.is_done).pipe(
                map((task: Task) => {
                    console.log(task);
                    return new CreateTaskSuccess(task)
                }), catchError((error) => {
                    console.log(error);
                    return of(new CreateTaskFailure({ error: error }));
                })
            )
        })
    )

}