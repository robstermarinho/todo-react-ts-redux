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

export function getAllTodosFromStorage() {
  const todos = getFromStorage({ key: 'todos' }) || []
  return todos
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
