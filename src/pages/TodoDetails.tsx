import { useState, useMemo, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import { v4 as uid } from 'uuid'
import styles from './TodoDetails.module.css'
import { FormInput } from '../components/FormInput'
import { Info } from '../components/Info'
import { Task, TasksHeader, TaskType } from '../components/Task'
import { useNavigate, useParams } from 'react-router-dom'

import {
  getTodoInfoFromStorage,
  updateNumberOfTodoTasksInStorage,
  getAllTodoTasksFromStorage,
  updateTodoTasksInStorage,
  removeAllTasksfromStorage,
} from '../helper/storage'
import { ArrowCircleLeft } from 'phosphor-react'
import { EmptyContainer } from '../components/EmptyContainer'
import { AppInfoContext } from '../helper/context'

export function TodoDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const slug = params.slug || ''
  const [todo] = useState(getTodoInfoFromStorage(slug))
  const [tasks, setTasks] = useState<TaskType[]>(
    getAllTodoTasksFromStorage(slug),
  )
  const { updateAppTotals } = useContext(AppInfoContext)

  useEffect(() => {
    updateAppTotals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks])

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: uid(),
      title,
      isDone: false,
      date: new Date(),
    }

    setTasks((prevTasks) => {
      const data = [...prevTasks, newTask].sort(sortTasks)
      updateTodoTasksInStorage(slug, data)

      return data
    })
  }

  const removeTask = (id: string) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks
        .filter((task) => task.id !== id)
        .sort(sortTasks)

      updateTodoTasksInStorage(slug, newTasks)

      return newTasks
    })
    toast.success('Task removed successfully!')
  }

  const removeAllTasks = () => {
    setTasks([])
    removeAllTasksfromStorage(slug)
  }

  const setAllTasksisDoneWithState = (state: boolean) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => ({ ...task, isDone: state }))
      updateTodoTasksInStorage(slug, newTasks)

      return newTasks
    })
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

      updateTodoTasksInStorage(slug, finalResult)

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
          <a
            onClick={() => {
              navigate('/')
              updateAppTotals()
            }}
            className={styles.backLink}
          >
            <ArrowCircleLeft />
            <span>Back </span>
          </a>
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
