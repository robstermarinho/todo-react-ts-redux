import { Cycle } from './cycle'

export interface TaskType {
  id: string
  title: string
  isDone: boolean
  date: number
}

export interface TodoType {
  id: string
  title: string
  slug: string
  date: number
  tasks: TaskType[]
}

export interface AppInfoProps {
  total: number
  totalCompleted: number
  totalTasks: number
  totalTasksCompleted: number
}

export interface TodosState {
  todos: TodoType[]
  tasks: TaskType[]
  info: AppInfoProps
}

export interface AppInfoContextType {
  todos: TodoType[]
  tasks: TaskType[]
  info: AppInfoProps
  addTodo: (title: string) => void
  removeTodoById: (todoId: string) => void
  removeAllTheTodos: () => void
  addTodoTask: (slug: string, task: TaskType) => void
  removeTodoTask: (slug: string, taskId: string) => void
  toggleTodoTaskState: (slug: string, taskId: string, done: boolean) => void
  toggleAllTodoTasksState: (slug: string, done: boolean) => void
  removeAllTodoTasks: (slug: string) => void
  findTodoBySlug: (slug: string) => TodoType | undefined
  getTodoTasksBySlug: (slug: string) => TaskType[]
}

export interface AppInfoContextProviderProps {
  children: React.ReactNode
}

export interface TaskProps {
  task: TaskType
  removeTask: (id: string) => void
  toggleTaskState: (id: string) => void
  activeCycle?: Cycle | null | undefined
}

export interface TasksHeaderProps {
  selectAll: (nextState: boolean) => void
  removeAll: () => void
}

export interface updateTodoNumbersParams {
  slug: string
  previousTasks: TaskType[]
  newTasks: TaskType[]
}
