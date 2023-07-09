import { produce } from 'immer'
import { TodoActionTypes } from './actions'
import { v4 as uid } from 'uuid'
import { TaskType, TodoType, TodosState } from '../../@types/todo'

/**
 * Initial state for the todos reducer
 */
export const initialTodosReducerState: TodosState = {
  todos: [],
  tasks: [],
  info: {
    total: 0,
    totalCompleted: 0,
    totalTasks: 0,
    totalTasksCompleted: 0,
  },
}
/**
 * Initializer for the todos reducer
 * It will check if there is any state stored in the localStorage and return it
 */
export const todosReducerInitializer = (initialState: TodosState) => {
  try {
    const value = localStorage.getItem('todos:v2')
    if (value) {
      return JSON.parse(value)
    }
  } catch (error) {
    console.log(`Error retrieving todos:v2 from localStorage`, error)
  }
  return initialState
}

function recalculateTodosInfo(todos: TodoType[]) {
  const totalNumberOfTasks = todos.reduce(
    (acc: number, todo: TodoType) => acc + todo.tasks.length,
    0,
  )

  const totalNumberOfCompletedTasks = todos.reduce(
    (acc: number, todo: TodoType) => {
      const numberOfDoneTasks = todo.tasks.filter(
        (task: TaskType) => task.isDone,
      ).length
      return acc + numberOfDoneTasks
    },
    0,
  )

  const totalOfCompletedTodoLists = todos.filter((todo: TodoType) => {
    const numberOfDoneTasks = todo.tasks.filter(
      (task: TaskType) => task.isDone,
    ).length
    return todo.tasks.length === numberOfDoneTasks && numberOfDoneTasks > 0
  }).length

  return {
    total: todos.length,
    totalTasks: totalNumberOfTasks,
    totalTasksCompleted: totalNumberOfCompletedTasks,
    totalCompleted: totalOfCompletedTodoLists,
  }
}

export function todosReducer(state: TodosState, action: any) {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO: {
      const newTodo: TodoType = {
        id: uid(),
        title: action.payload.title,
        slug: action.payload.slug,
        date: new Date(),
        tasks: [],
      }

      /*
        Immutability way

        const newInfo = recalculateTodosInfo(newTodos)
        return {
            ...state,
            todos: [...state.todos, newTodo],
            info: {
            ...state.info,
            ...newInfo,
            },
        }
      */

      // With Immer
      return produce(state, (draft) => {
        draft.todos.push(newTodo)
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    case TodoActionTypes.REMOVE_TODO: {
      /*
        Immutability way
        const newTodos = state.todos.filter(
            (todo: TodoType) => todo.id !== action.payload.todoId,
        )
        const newInfo = recalculateTodosInfo(newTodos)
        return {
            ...state,
            todos: newTodos,
            info: {
            ...state.info,
            ...newInfo,
            },
        }
    */
      // With Immer
      const currenttodoIdIndex = state.todos.findIndex(
        (todo: TodoType) => todo.id === action.payload.todoId,
      )

      if (currenttodoIdIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.todos.splice(currenttodoIdIndex, 1)
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    case TodoActionTypes.REMOVE_ALL_TODOS: {
      /*
        Immutability way

      return {
        ...state,
        todos: [],
        info: {
          ...state.info,
          total: 0,
          totalCompleted: 0,
          totalTasks: 0,
          totalTasksCompleted: 0,
        },
      }
      */

      // With Immer
      return produce(state, (draft) => {
        draft.todos = []
        draft.info = {
          total: 0,
          totalCompleted: 0,
          totalTasks: 0,
          totalTasksCompleted: 0,
        }
      })
    }

    case TodoActionTypes.ADD_TODO_TASK: {
      const { slug, task } = action.payload
      /*
        Immutability way

      const newTodos = state.todos.map((todo: TodoType) => {
        if (todo.slug === slug) {
          const newTodoTasks = [...todo.tasks, task]
          return {
            ...todo,
            tasks: newTodoTasks,
          }
        }
        return todo
      })

      const newInfo = recalculateTodosInfo(newTodos)

      return {
        ...state,
        todos: newTodos,
        info: {
          ...state.info,
          ...newInfo,
        },
      }
      */

      // With Immer
      return produce(state, (draft) => {
        const currentTodoIndex = draft.todos.findIndex(
          (todo: TodoType) => todo.slug === slug,
        )

        if (currentTodoIndex < 0) {
          return state
        }

        draft.todos[currentTodoIndex].tasks.push(task)
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    case TodoActionTypes.REMOVE_TODO_TASK: {
      const { slug, taskId } = action.payload

      /*
        Immutability way

      const newTodos = state.todos.map((todo: TodoType) => {
        if (todo.slug === slug) {
          const newTodoTasks = todo.tasks.filter(
            (task: TaskType) => task.id !== taskId,
          )
          return {
            ...todo,
            tasks: newTodoTasks,
          }
        }
        return todo
      })

      const newInfo = recalculateTodosInfo(newTodos)

      return {
        ...state,
        todos: newTodos,
        info: {
          ...state.info,
          ...newInfo,
        },
      }
      */

      // With Immer
      return produce(state, (draft) => {
        const currentTodoIndex = draft.todos.findIndex(
          (todo: TodoType) => todo.slug === slug,
        )
        if (currentTodoIndex < 0) {
          return state
        }
        const currentTaskIndex = draft.todos[currentTodoIndex].tasks.findIndex(
          (task: TaskType) => task.id === taskId,
        )
        if (currentTaskIndex < 0) {
          return state
        }
        draft.todos[currentTodoIndex].tasks.splice(currentTaskIndex, 1)
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    case TodoActionTypes.REMOVE_ALL_TODO_TASKS: {
      const { slug } = action.payload
      /* Immutability way

      const newTodos = state.todos.map((todo: TodoType) => {
        if (todo.slug === slug) {
          return {
            ...todo,
            tasks: [],
          }
        }
        return todo
      })
      const newInfo = recalculateTodosInfo(newTodos)
      return {
        ...state,
        todos: newTodos,
        info: {
          ...state.info,
          ...newInfo,
        },
      }
    */

      // With Immer
      return produce(state, (draft) => {
        const currentTodoIndex = draft.todos.findIndex(
          (todo: TodoType) => todo.slug === slug,
        )
        if (currentTodoIndex < 0) {
          return state
        }
        draft.todos[currentTodoIndex].tasks = []
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    case TodoActionTypes.TOGGLE_TODO_TASK_STATE: {
      const { slug, taskId, done } = action.payload

      /* Immutability way

      const newTodos = state.todos.map((todo: TodoType) => {
        if (todo.slug === slug) {
          const newTodoTasks = todo.tasks.map((task: TaskType) => {
            if (task.id === taskId) {
              return {
                ...task,
                isDone: done,
              }
            }
            return task
          })
          return {
            ...todo,
            tasks: newTodoTasks,
          }
        }
        return todo
      })
      const newInfo = recalculateTodosInfo(newTodos)
      return {
        ...state,
        todos: newTodos,
        info: {
          ...state.info,
          ...newInfo,
        },
      }
      */

      // With Immer
      return produce(state, (draft) => {
        const currentTodoIndex = draft.todos.findIndex(
          (todo: TodoType) => todo.slug === slug,
        )
        if (currentTodoIndex < 0) {
          return state
        }
        const currentTaskIndex = draft.todos[currentTodoIndex].tasks.findIndex(
          (task: TaskType) => task.id === taskId,
        )
        if (currentTaskIndex < 0) {
          return state
        }
        draft.todos[currentTodoIndex].tasks[currentTaskIndex].isDone = done
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    case TodoActionTypes.TOGGLE_ALL_TODO_TASKS_STATE: {
      const { slug, done } = action.payload

      /* Immutability way

      const newTodos = state.todos.map((todo: TodoType) => {
        if (todo.slug === slug) {
          const newTodoTasks = todo.tasks.map((task: TaskType) => {
            return {
              ...task,
              isDone: done,
            }
          })
          return {
            ...todo,
            tasks: newTodoTasks,
          }
        }
        return todo
      })
      const newInfo = recalculateTodosInfo(newTodos)
      return {
        ...state,
        todos: newTodos,
        info: {
          ...state.info,
          ...newInfo,
        },
      }
      */

      // With Immer
      return produce(state, (draft) => {
        const currentTodoIndex = draft.todos.findIndex(
          (todo: TodoType) => todo.slug === slug,
        )
        if (currentTodoIndex < 0) {
          return state
        }
        draft.todos[currentTodoIndex].tasks.forEach((task: TaskType) => {
          task.isDone = done
        })
        draft.info = recalculateTodosInfo(draft.todos)
      })
    }

    default:
      return state
  }
}
