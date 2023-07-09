import { createContext, useEffect, useReducer } from 'react'
import {
  initialTodosReducerState,
  todosReducer,
  todosReducerInitializer,
} from '../reducers/todos/reducer'

import { slugify } from './util'
import {
  addTodoAction,
  removeAllTodosAction,
  removeTodoAction,
  addTodoTaskAction,
  removeAllTodoTasksAction,
  removeTodoTaskAction,
  toggleTodoTaskStateAction,
  toggleAllTodoTasksStateAction,
} from '../reducers/todos/actions'

import { toast } from 'react-toastify'
import {
  AppInfoContextProviderProps,
  AppInfoContextType,
  TodoType,
} from '../@types/todo'

export const AppInfoContext = createContext({} as AppInfoContextType)

export function AppInfoContextProvider({
  children,
}: AppInfoContextProviderProps) {
  // Todos reducer
  const [todosState, dispatch] = useReducer(
    todosReducer,
    initialTodosReducerState,
    todosReducerInitializer,
  )
  const { info, todos, tasks } = todosState

  // Update storage on every todosState change
  useEffect(() => {
    try {
      localStorage.setItem('todos:v2', JSON.stringify(todosState))
    } catch (error) {
      console.log(`Error storing todos:v2 to localStorage`, error)
    }
  }, [todosState])

  const addTodo = (title: string) => {
    const slug = slugify(title)
    const slugExists = todos.find((todo: TodoType) => todo.slug === slug)
    if (slugExists) {
      toast.error('This todo title has already been used.')
      return
    }

    dispatch(addTodoAction(title, slug))
  }

  const removeTodoById = (todoId: string) => {
    dispatch(removeTodoAction(todoId))
  }

  const removeAllTheTodos = () => {
    dispatch(removeAllTodosAction())
  }

  const addTodoTask = (slug: string, task: TaskType) => {
    dispatch(addTodoTaskAction(slug, task))
  }

  const removeTodoTask = (slug: string, taskId: string) => {
    dispatch(removeTodoTaskAction(slug, taskId))
  }

  const removeAllTodoTasks = (slug: string) => {
    dispatch(removeAllTodoTasksAction(slug))
  }

  const findTodoBySlug = (slug: string) => {
    return todos.find((todo: TodoType) => todo.slug === slug)
  }

  const getTodoTasksBySlug = (slug: string) => {
    const todo = findTodoBySlug(slug)
    if (!todo) {
      return []
    }
    return todo.tasks
  }

  const toggleTodoTaskState = (slug: string, taskId: string, done: boolean) => {
    dispatch(toggleTodoTaskStateAction(slug, taskId, done))
  }

  const toggleAllTodoTasksState = (slug: string, done: boolean) => {
    dispatch(toggleAllTodoTasksStateAction(slug, done))
  }

  return (
    <AppInfoContext.Provider
      value={{
        todos,
        tasks,
        info,
        addTodo,
        removeTodoById,
        removeAllTheTodos,
        addTodoTask,
        removeTodoTask,
        removeAllTodoTasks,
        toggleTodoTaskState,
        toggleAllTodoTasksState,
        findTodoBySlug,
        getTodoTasksBySlug,
      }}
    >
      {children}
    </AppInfoContext.Provider>
  )
}
