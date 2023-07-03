import { TaskType } from '../components/Task'
import { TodoProps } from '../components/Todo'

interface StorageProps {
  key: string
  value: unknown
}

export function storeInStorage({ key, value }: StorageProps) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(`Error storing ${key} to localStorage`, error)
  }
}

export function getFromStorage({ key }: Omit<StorageProps, 'value'>) {
  try {
    const value = localStorage.getItem(key)

    if (value) return JSON.parse(value)
  } catch (error) {
    console.log(`Error retrieving ${key} from localStorage`, error)
  }
  return null
}

export function clearKeyFromStorage({ key }: Omit<StorageProps, 'value'>) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log(`Error clearing ${key} from localStorage`, error)
  }
}

/**  TODOS */
export function getAllTodosFromStorage() {
  const todos = getFromStorage({ key: 'todos' }) || []
  return todos
}

export function updateTodosInStorage(todos: TodoProps[]): TodoProps[] {
  storeInStorage({ key: 'todos', value: todos })
  return todos
}

export function removeAllTodosFromStorage() {
  storeInStorage({ key: 'todos', value: [] })
}

export function getTodoInfoFromStorage(slug: string) {
  const todos = getAllTodosFromStorage()
  const todo = todos.find((todo: TodoProps) => todo.slug === slug)
  return todo
}

export function updateNumberOfTodoTasksInStorage(
  slug: string,
  numberOftasks: number,
  numberOfDoneTasks: number,
) {
  const todos = getAllTodosFromStorage()
  const newTodos = todos.map((todo: TodoProps) => {
    if (todo.slug === slug) {
      return {
        ...todo,
        numberOftasks,
        numberOfDoneTasks,
      }
    }
    return todo
  })
  storeInStorage({ key: 'todos', value: newTodos })
}

/**  TASKS */
export function removeAllTodoTasksfromStorage(id: string) {
  const todos = getAllTodosFromStorage()
  const todo = todos.find((todoItem: TodoProps) => todoItem.id === id)
  if (!todo) return
  removeAllTasksfromStorage(todo.slug)
}

export function removeAllTasksfromStorage(slug: string) {
  clearKeyFromStorage({ key: `${slug}/tasks` })
}

export function getAllTodoTasksFromStorage(slug: string) {
  const tasks = getFromStorage({ key: `${slug}/tasks` }) || []
  return tasks
}

export function updateTodoTasksInStorage(slug: string, tasks: TaskType[]) {
  storeInStorage({ key: `${slug}/tasks`, value: tasks })
  return tasks
}

export function getAppTotalsFromStorage() {
  const todos = getAllTodosFromStorage()

  const totalOfCompletedTodoLists = todos.reduce(
    (current: number, todo: TodoProps) => {
      if (
        todo.numberOfDoneTasks === todo.numberOftasks &&
        todo.numberOfDoneTasks > 0
      ) {
        return current + 1
      }
      return current
    },
    0,
  )

  const totalNumberOfTasks = todos.reduce(
    (current: number, todo: TodoProps) => {
      return current + todo.numberOftasks
    },
    0,
  )

  const totalNumberOfCompletedTasks = todos.reduce(
    (current: number, todo: TodoProps) => {
      return current + todo.numberOfDoneTasks
    },
    0,
  )

  return {
    total: todos.length,
    totalCompleted: totalOfCompletedTodoLists,
    totalTasks: totalNumberOfTasks,
    totalTasksCompleted: totalNumberOfCompletedTasks,
  }
}
