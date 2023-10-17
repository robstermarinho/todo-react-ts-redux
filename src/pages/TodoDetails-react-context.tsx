import { useState, useMemo, useContext } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import { v4 as uid } from 'uuid'
import styles from './TodoDetails.module.css'
import { FormInput } from '../components/FormInput'
import { Info } from '../components/Info'
import { Task, TasksHeader } from '../components/Task'
import { NavLink, useParams } from 'react-router-dom'

import { ArrowCircleLeft } from 'phosphor-react'
import { EmptyContainer } from '../components/EmptyContainer'
import { AppInfoContext } from '../helper/context'
import { TaskType } from '../@types/todo'
import { getUnixTime } from 'date-fns'

export function TodoDetails() {
  const {
    findTodoBySlug,
    getTodoTasksBySlug,
    addTodoTask,
    removeTodoTask,
    removeAllTodoTasks,
    toggleTodoTaskState,
    toggleAllTodoTasksState,
  } = useContext(AppInfoContext)

  const params = useParams()
  const slug = params.slug || ''
  const [todo] = useState(findTodoBySlug(slug))
  const [tasks, setTasks] = useState<TaskType[]>(getTodoTasksBySlug(slug))

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: uid(),
      title,
      isDone: false,
      date: getUnixTime(new Date()),
    }

    setTasks((previousTasks) => {
      const newTasks = [...previousTasks, newTask].sort(sortTasks)
      return newTasks
    })

    addTodoTask(slug, newTask)
    toast.success('Task added successfully!')
  }

  const removeTask = (taskId: string) => {
    const foundTask = tasks.find((task) => task.id === taskId)

    if (!foundTask) {
      toast.error('Task not found!')
      return
    }

    setTasks((previousTasks) => {
      const newTasks = previousTasks
        .filter((task) => task.id !== foundTask.id)
        .sort(sortTasks)
      return newTasks
    })

    removeTodoTask(slug, taskId)
    toast.success('Task removed successfully!')
  }

  const removeAllTasks = () => {
    setTasks([])
    removeAllTodoTasks(slug)
  }

  const toggleAllTasksState = (state: boolean) => {
    setTasks((previousTasks) => {
      const newTasks = previousTasks.map((task) => ({
        ...task,
        isDone: state,
      }))

      return newTasks
    })
    toggleAllTodoTasksState(slug, state)
  }

  const toggleTaskState = (id: string) => {
    const findTask = tasks.find((task) => task.id === id)
    if (!findTask) {
      toast.error('Task not found!')
      return
    }
    const taskCurrentState = findTask.isDone

    setTasks((previousTasks) => {
      const newTasks = previousTasks
        .map((task) => {
          if (task.id === findTask.id) {
            return {
              ...task,
              isDone: !taskCurrentState,
              date: getUnixTime(new Date()),
            }
          }
          return task
        })
        .sort(sortTasks)

      return newTasks
    })

    toggleTodoTaskState(slug, findTask.id, !taskCurrentState)
  }

  const numberOfTasks = useMemo((): string => {
    return `${tasks.length}`
  }, [tasks])

  const numberOfDoneTasks = useMemo((): string => {
    const doneTasks = tasks.filter((task) => task.isDone)
    return `${doneTasks.length}`
  }, [tasks])

  const sortTasks = (taskA: TaskType, taskB: TaskType) => {
    if (taskA.isDone && !taskB.isDone) {
      return 1
    }
    if (!taskA.isDone && taskB.isDone) {
      return -1
    }
    return 0
  }

  const renderTasks = () => {
    if (tasks.length === 0) {
      return (
        <EmptyContainer
          title="You do not have any tasks registered yet"
          subTitle="Create tasks and organize your to-do items."
        />
      )
    }

    return (
      <AnimatePresence>
        <TasksHeader
          key={'task-header'}
          selectAll={toggleAllTasksState}
          removeAll={removeAllTasks}
        />
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            removeTask={removeTask}
            toggleTaskState={toggleTaskState}
          />
        ))}
      </AnimatePresence>
    )
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <FormInput placeholder="Add new task" addAction={addTask} />
        {todo && <h3>{todo.title}</h3>}
        <div className={styles.todoHeaderContainer}>
          <NavLink to="/" className={styles.backLink}>
            <ArrowCircleLeft />
            <span>Back </span>
          </NavLink>
          <div className={styles.infoContainer}>
            <Info title="Tasks" amount={numberOfTasks} />
            <Info title="Done" amount={numberOfDoneTasks} purple />
          </div>
        </div>
        <div className={styles.todoListContainer}>{renderTasks()}</div>
      </div>
    </div>
  )
}
