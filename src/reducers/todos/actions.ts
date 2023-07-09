import { TaskType } from '../../@types/todo'

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  REMOVE_ALL_TODOS = 'REMOVE_ALL_TODOS',

  ADD_TODO_TASK = 'ADD_TODO_TASK',
  REMOVE_TODO_TASK = 'REMOVE_TODO_TASK',
  REMOVE_ALL_TODO_TASKS = 'REMOVE_ALL_TODO_TASKS',
  TOGGLE_TODO_TASK_STATE = 'TOGGLE_TODO_TASK_STATE',
  TOGGLE_ALL_TODO_TASKS_STATE = 'TOGGLE_ALL_TODO_TASKS_STATE',
}

export function addTodoAction(title: string, slug: string) {
  return {
    type: TodoActionTypes.ADD_TODO,
    payload: {
      title,
      slug,
    },
  }
}

export function removeTodoAction(todoId: string) {
  return {
    type: TodoActionTypes.REMOVE_TODO,
    payload: {
      todoId,
    },
  }
}

export function removeAllTodosAction() {
  return {
    type: TodoActionTypes.REMOVE_ALL_TODOS,
  }
}

export function addTodoTaskAction(slug: string, task: TaskType) {
  return {
    type: TodoActionTypes.ADD_TODO_TASK,
    payload: {
      slug,
      task,
    },
  }
}

export function removeTodoTaskAction(slug: string, taskId: string) {
  return {
    type: TodoActionTypes.REMOVE_TODO_TASK,
    payload: {
      slug,
      taskId,
    },
  }
}

export function removeAllTodoTasksAction(slug: string) {
  return {
    type: TodoActionTypes.REMOVE_ALL_TODO_TASKS,
    payload: {
      slug,
    },
  }
}

export function toggleTodoTaskStateAction(
  slug: string,
  taskId: string,
  done: boolean,
) {
  return {
    type: TodoActionTypes.TOGGLE_TODO_TASK_STATE,
    payload: {
      slug,
      taskId,
      done,
    },
  }
}

export function toggleAllTodoTasksStateAction(slug: string, done: boolean) {
  return {
    type: TodoActionTypes.TOGGLE_ALL_TODO_TASKS_STATE,
    payload: {
      slug,
      done,
    },
  }
}
