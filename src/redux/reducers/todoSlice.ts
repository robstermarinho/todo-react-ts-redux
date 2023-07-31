import { createSlice } from '@reduxjs/toolkit'
import { TaskType, TodoType, TodosState } from '../../@types/todo'
import { v4 as uid } from 'uuid'
import {
  initialTodosReducerState,
  recalculateTodosInfo,
} from '../../reducers/todos/reducer'
import { getUnixTime } from 'date-fns'
import { reducerStateType } from '../store'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialTodosReducerState,
  reducers: {
    addTodo: (state: TodosState, action) => {
      const newTodo: TodoType = {
        id: uid(),
        title: action.payload.title,
        slug: action.payload.slug,
        date: getUnixTime(new Date()),
        tasks: [],
      }

      state.todos.push(newTodo)
      state.info = recalculateTodosInfo(state.todos)
    },
    removeTodo: (state, action) => {
      const currenttodoIdIndex = state.todos.findIndex(
        (todo: TodoType) => todo.id === action.payload.todoId,
      )

      if (currenttodoIdIndex < 0) {
        return state
      }
      state.todos.splice(currenttodoIdIndex, 1)
      state.info = recalculateTodosInfo(state.todos)
    },
    removeAllTodos: (state) => {
      state.todos = []
      state.info = recalculateTodosInfo(state.todos)
    },
    addTodoTask: (state, action) => {
      const { slug, task } = action.payload

      const currentTodoIndex = state.todos.findIndex(
        (todo: TodoType) => todo.slug === slug,
      )

      if (currentTodoIndex < 0) {
        return state
      }

      state.todos[currentTodoIndex].tasks.push(task)
      state.info = recalculateTodosInfo(state.todos)
    },
    removeTodoTask: (state, action) => {
      const { slug, taskId } = action.payload

      const currentTodoIndex = state.todos.findIndex(
        (todo: TodoType) => todo.slug === slug,
      )

      if (currentTodoIndex < 0) {
        return state
      }
      const currentTaskIndex = state.todos[currentTodoIndex].tasks.findIndex(
        (task) => task.id === taskId,
      )
      if (currentTaskIndex < 0) {
        return state
      }
      state.todos[currentTodoIndex].tasks.splice(currentTaskIndex, 1)
      state.info = recalculateTodosInfo(state.todos)
    },
    removeAllTodoTasks: (state, action) => {
      const { slug } = action.payload

      const currentTodoIndex = state.todos.findIndex(
        (todo: TodoType) => todo.slug === slug,
      )
      if (currentTodoIndex < 0) {
        return state
      }
      state.todos[currentTodoIndex].tasks = []
      state.info = recalculateTodosInfo(state.todos)
    },
    toggleTodoTask: (state, action) => {
      const { slug, taskId, done } = action.payload

      const currentTodoIndex = state.todos.findIndex(
        (todo: TodoType) => todo.slug === slug,
      )
      if (currentTodoIndex < 0) {
        return state
      }
      const currentTaskIndex = state.todos[currentTodoIndex].tasks.findIndex(
        (task: TaskType) => task.id === taskId,
      )
      if (currentTaskIndex < 0) {
        return state
      }

      if (done) {
        const currentTask = state.todos[currentTodoIndex].tasks.splice(
          currentTaskIndex,
          1,
        )[0]
        currentTask.isDone = done

        state.todos[currentTodoIndex].tasks.push(currentTask)
      } else {
        state.todos[currentTodoIndex].tasks[currentTaskIndex].isDone = done
      }
      state.info = recalculateTodosInfo(state.todos)
    },
    toggleAllTodoTasks: (state, action) => {
      const { slug, done } = action.payload

      const currentTodoIndex = state.todos.findIndex(
        (todo: TodoType) => todo.slug === slug,
      )
      if (currentTodoIndex < 0) {
        return state
      }
      state.todos[currentTodoIndex].tasks.forEach((task: TaskType) => {
        task.isDone = done
      })
      state.info = recalculateTodosInfo(state.todos)
    },
    recalculateInfo: (state) => {
      console.log('recalculateInfo')
      state.info = recalculateTodosInfo(state.todos)
    },
  },
})

/**
 * Actions
 */

export const {
  addTodo,
  removeTodo,
  removeAllTodos,
  addTodoTask,
  removeTodoTask,
  removeAllTodoTasks,
  toggleTodoTask,
  toggleAllTodoTasks,
  recalculateInfo,
} = todoSlice.actions

/**
 * Selectors
 */

export const selectTodos = (state: reducerStateType) => state.todos.todos

export const selectInfo = (state: reducerStateType) => state.todos.info

export const selectTodoBySlug = (state: reducerStateType, slug: string) =>
  state.todos.todos.find((todo: TodoType) => todo.slug === slug)

export const selectActiveTodoByTaskId = (
  state: reducerStateType,
  activeTaskId: string | null,
) =>
  state.todos.todos.find((todo: TodoType) =>
    todo.tasks.find((task) => task.id === activeTaskId),
  )

/**
 * Thunk functions
 */

export const recalculateInfoAsync =
  () =>
  (dispatch: any, getState: any): void => {
    console.log(getState(), 'CURRENT STATE')
    setTimeout(() => {
      console.log(getState(), 'CURRENT STATE ASYNC')
      dispatch(recalculateInfo())
    }, 1000)
  }

export const fetchDataExample = () => {
  return async (dispatch: any, getState: any) => {
    try {
      await fetch('http://localhost:3333/todos')
        .then((response) => response.json())
        .then((json) => console.log(json))

      console.log(getState(), 'CURRENT STATE')
    } catch (e) {
      console.log(e)
    }
  }
}

export default todoSlice.reducer
