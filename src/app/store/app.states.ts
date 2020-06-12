import * as auth from './reducers/auth.reducers';
import { createFeatureSelector } from '@ngrx/store';
import * as task from './reducers/task.reducers';



export interface AppState {
  authState: auth.State;
  taskState: task.State;
}

export const reducers = {
  auth: auth.reducer,
  task: task.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectTaskState = createFeatureSelector<AppState>('task');