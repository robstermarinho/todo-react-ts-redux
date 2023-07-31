import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import { v4 as uid } from 'uuid'
import styles from './TodoDetails.module.css'
import { FormInput } from '../components/FormInput'
import { Info } from '../components/Info'
import { Task, TasksHeader } from '../components/Task'
import { NavLink, useParams } from 'react-router-dom'

import { ArrowCircleLeft, Clock } from 'phosphor-react'
import { EmptyContainer } from '../components/EmptyContainer'
import { TaskType, TodoType, TodosState } from '../@types/todo'
import {
  addTodoTask,
  removeAllTodoTasks,
  removeTodoTask,
  toggleAllTodoTasks,
  toggleTodoTask,
  selectTodoBySlug,
} from '../redux/reducers/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUnixTime } from 'date-fns'
import { reducerStateType } from '../redux/store'

export function TodoDetails() {
  const params = useParams()
  const slug = params.slug || ''
  const dispatch = useDispatch()

  const todo = useSelector((state: reducerStateType) =>
    selectTodoBySlug(state, slug),
  )

  const handleAddTask = (title: string) => {
    const newTask: TaskType = {
      id: uid(),
      title,
      isDone: false,
      date: getUnixTime(new Date()),
    }

    dispatch(addTodoTask({ slug, task: newTask }))
    toast.success('Task added successfully!')
  }

  const handleRemoveTask = (taskId: string) => {
    if (!todo) {
      toast.error('Todo not found!')
      return
    }

    const foundTask = todo.tasks.find((task) => task.id === taskId)

    if (!foundTask) {
      toast.error('Task not found!')
    }

    dispatch(removeTodoTask({ slug, taskId }))
  }

  const handleRemoveAllTasks = () => {
    dispatch(removeAllTodoTasks({ slug }))
  }

  const handleToggleAllTasksState = (state: boolean) => {
    dispatch(toggleAllTodoTasks({ slug, done: state }))
  }

  const toggleTaskState = (taskId: string) => {
    if (!todo) {
      toast.error('Todo not found!')
      return
    }

    const findTask = todo.tasks.find((task) => task.id === taskId)

    if (!findTask) {
      toast.error('Task not found!')
      return
    }

    const taskCurrentState = findTask.isDone

    dispatch(toggleTodoTask({ slug, taskId, done: !taskCurrentState }))
  }

  const numberOfTasks = useMemo((): string => {
    if (!todo) {
      return '0'
    }

    return `${todo.tasks.length}`
  }, [todo])

  const numberOfDoneTasks = useMemo((): string => {
    if (!todo) {
      return '0'
    }

    const doneTasks = todo.tasks.filter((task) => task.isDone)

    return `${doneTasks.length}`
  }, [todo])

  const renderTasks = () => {
    if (!todo) {
      return (
        <EmptyContainer
          title="Todo not found"
          subTitle="Go back to the home page and select a todo list."
          button={
            <NavLink to="/">
              <ArrowCircleLeft />
              <span>Home Page </span>
            </NavLink>
          }
        />
      )
    }
    if (!todo || todo.tasks.length === 0) {
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
          selectAll={handleToggleAllTasksState}
          removeAll={handleRemoveAllTasks}
        />
        {todo &&
          todo.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={handleRemoveTask}
              toggleTaskState={toggleTaskState}
            />
          ))}
      </AnimatePresence>
    )
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <FormInput
          inactive={!todo}
          placeholder="Add new task"
          addAction={handleAddTask}
        />

        {todo && <h3>{todo.title}</h3>}
        <div className={styles.todoHeaderContainer}>
          <div className={styles.todoHeader}>
            <NavLink to="/" className={styles.backLink}>
              <ArrowCircleLeft />
              <span>Back </span>
            </NavLink>

            <NavLink to={`/todo/${slug}/cycle`} className={styles.backLink}>
              <Clock />
              Task Timer
            </NavLink>
          </div>
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
