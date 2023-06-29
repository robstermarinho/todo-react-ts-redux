import { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import { v4 as uid } from 'uuid'
import styles from './TodoDetails.module.css'

import { FormInput } from '../components/FormInput'
import { Info } from '../components/Info'
import { Task, EmptyTask, TasksHeader, TaskType } from '../components/Task'
import { storeInStorage, getFromStorage } from '../helper/storage'
import { useParams } from 'react-router-dom'

export function TodoDetails() {
  const params = useParams()
  const slug = params.slug || ''
  console.log('slug', slug)
  const storageKey = `${slug}/tasks`

  const [tasks, setTasks] = useState<TaskType[]>(
    getFromStorage({ key: storageKey }) || [],
  )

  const todoTitle = ''

  const setAllTasksisDoneWithState = (state: boolean) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => ({ ...task, isDone: state }))
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
    return `${doneTasks.length} of ${numberOfTasks}`
  }, [tasks, numberOfTasks])

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
      return <EmptyTask />
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
        <h3>{todoTitle}</h3>
        <FormInput placeholder="Add new task" addAction={addTask} />
        <div className={styles.todoHeaderContainer}>
          <Info title="Tasks" amount={numberOfTasks} />
          <Info title="Done" amount={numberOfDoneTasks} purple />
        </div>
        <div className={styles.todoListContainer}>{renderTasks()}</div>
      </div>
    </div>
  )
}
