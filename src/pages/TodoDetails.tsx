import { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import { v4 as uid } from 'uuid'
import styles from './TodoDetails.module.css'

import { FormInput } from '../components/FormInput'
import { Info } from '../components/Info'
import { Task, TasksHeader, TaskType } from '../components/Task'
import {
  storeInStorage,
  getFromStorage,
  getTodoInfoFromStorage,
  updateNumberOfTodoTasksInStorage,
} from '../helper/storage'
import { Link, useParams } from 'react-router-dom'

import { ArrowCircleLeft } from 'phosphor-react'
import { EmptyContainer } from '../components/EmptyContainer'
export function TodoDetails() {
  const params = useParams()
  const slug = params.slug || ''
  const storageKey = `${slug}/tasks`

  const [todo] = useState(getTodoInfoFromStorage(slug))
  const [tasks, setTasks] = useState<TaskType[]>(
    getFromStorage({ key: storageKey }) || [],
  )

  const setAllTasksisDoneWithState = (state: boolean) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => ({ ...task, isDone: state }))
      storeInStorage({ key: storageKey, value: newTasks })
      return newTasks
    })
  }

  const removeAllTasks = () => {
    setTasks([])
    storeInStorage({ key: storageKey, value: [] })
  }

  const numberOfTasks = useMemo((): string => {
    return `${tasks.length}`
  }, [tasks])

  const numberOfDoneTasks = useMemo((): string => {
    const doneTasks = tasks.filter((task) => task.isDone)
    updateNumberOfTodoTasksInStorage(slug, tasks.length, doneTasks.length)
    return `${doneTasks.length}`
  }, [tasks, slug])

  const sortTasks = (taskA: TaskType, taskB: TaskType) => {
    if (taskA.isDone && !taskB.isDone) {
      return 1
    }
    if (!taskA.isDone && taskB.isDone) {
      return -1
    }
    return 0
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: uid(),
      title,
      isDone: false,
      date: new Date(),
    }

    setTasks((prevTasks) => {
      const finalResult = [...prevTasks, newTask].sort(sortTasks)

      storeInStorage({ key: storageKey, value: finalResult })

      return finalResult
    })

    toast.success('Task added successfully!')
  }

  const removeTask = (id: string) => {
    setTasks((prevTasks) => {
      const finalResult = prevTasks
        .filter((task) => task.id !== id)
        .sort(sortTasks)

      storeInStorage({ key: storageKey, value: finalResult })

      return finalResult
    })
    toast.success('Task removed successfully!')
  }

  const toggleTaskState = (id: string) => {
    setTasks((prevTasks) => {
      const finalResult = prevTasks
        .map((task) => {
          if (task.id === id) {
            return { ...task, isDone: !task.isDone, date: new Date() }
          }
          return task
        })
        .sort(sortTasks)

      storeInStorage({ key: storageKey, value: finalResult })
      return finalResult
    })
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
          selectAll={setAllTasksisDoneWithState}
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
        <h3>{todo.title}</h3>
        <div className={styles.todoHeaderContainer}>
          <Link to={`/`} className={styles.backLink}>
            <ArrowCircleLeft />
            <span>Back </span>
          </Link>
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
