import { createSlice } from '@reduxjs/toolkit'
import { TaskType, TodoType, TodosState } from '../../@types/todo'
import { v4 as uid } from 'uuid'
import {
  initialTodosReducerState,
  recalculateTodosInfo,
} from '../../reducers/todos/reducer'
import { getUnixTime } from 'date-fns'

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
      state.todos[currentTodoIndex].tasks[currentTaskIndex].isDone = done
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
      state.info = recalculateTodosInfo(state.todos)
    },
  },
})

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

export default todoSlice.reducer

export const recalculateInfoAsync = () => (dispatch: any, getState: any) => {
  setTimeout(() => {
    console.log(getState(), 'CURRENT STATE ASYNC')
    dispatch(recalculateInfo())
  }, 1000)
}
