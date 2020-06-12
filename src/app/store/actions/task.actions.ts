import { Action } from '@ngrx/store';
import { Task } from 'src/app/models/task';

export enum TaskActionTypes {
    GET_TASKS = '[Task] Get Tasks',
    GET_TASKS_SUCCESS = '[Task] Get Tasks Success',
    GET_TASKS_FAILURE = '[Task] Get Tasks Failure',
    CREATE_TASK = '[Task] Register',
    CREATE_TASK_SUCCESS = '[Task] Signup Success',
    CREATE_TASK_FAILURE = '[Task] Signup Failure',
    TOGGLE_TASK = '[Task] Toggle Task',
    TOGGLE_TASK_SUCCESS = '[Task] Toggle Task Success',
    TOGGLE_TASK_FAILURE = '[Task] Toggle Task Failure'
}

export class GetTasks implements Action {
    readonly type = TaskActionTypes.GET_TASKS;
    constructor(public payload: any) {}
}

export class GetTasksSuccess implements Action {
    readonly type = TaskActionTypes.GET_TASKS_SUCCESS;
    constructor(public payload: any) {}
}

export class GetTasksFailure implements Action {
    readonly type = TaskActionTypes.GET_TASKS_FAILURE;
    constructor(public payload: any) {}
}

export class CreateTask implements Action {
    readonly type = TaskActionTypes.CREATE_TASK;
    constructor(public payload: any) {}
}

export class CreateTaskSuccess implements Action {
    readonly type = TaskActionTypes.CREATE_TASK_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateTaskFailure implements Action {
    readonly type = TaskActionTypes.CREATE_TASK_FAILURE;
    constructor(public payload: any) {}
}

export class ToggleTask implements Action {
    readonly type = TaskActionTypes.TOGGLE_TASK;
    constructor(public payload: {id: number}) {};
}



export type All =
    | GetTasks
    | GetTasksSuccess
    | GetTasksFailure
    | CreateTask
    | CreateTaskSuccess
    | CreateTaskFailure
    | ToggleTask;