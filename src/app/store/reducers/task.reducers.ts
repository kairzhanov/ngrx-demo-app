import { Task } from 'src/app/models/task';
import { TaskActionTypes, All } from '../actions/task.actions';




export interface State {
    tasks: Array<Task>;
    errorMessage: string | null;
}

export const initialState: State = {
    tasks: Array<Task>(),
    errorMessage: null
}

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case TaskActionTypes.GET_TASKS_SUCCESS: {
          return {
            ...state,
            tasks: action.payload,
            errorMessage: null
          };
        }
        case TaskActionTypes.GET_TASKS_FAILURE: {
          return {
            ...state,
            tasks: null,
            errorMessage: 'Failed to get task list'
          };
        }
        case TaskActionTypes.CREATE_TASK_SUCCESS: {
            console.log(action.payload);
            console.log(state);
          return {
            ...state,
            tasks: state.tasks.concat(action.payload),
            errorMessage: null
          };
        }
        case TaskActionTypes.CREATE_TASK_FAILURE: {
          return {
            ...state,
            errorMessage: 'Failed to create a task'
          };
        }
        case TaskActionTypes.TOGGLE_TASK: {
            // console.log(state);
            // console.log(action.payload);
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id == action.payload.id) {
                        return { ...task, is_done: !task.is_done }
                    }
                    return {...task}
                })
            };
        }
        default: {
          return state;
        }
      }
}