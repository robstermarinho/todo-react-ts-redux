import { useContext, useState, useEffect } from 'react'
import { FormInput } from '../../components/FormInput'
import { HomePageContainer } from './styles'
import { v4 as uid } from 'uuid'
import { toast } from 'react-toastify'
import {
  getAllTodosFromStorage,
  removeAllTodoTasksfromStorage,
  updateTodosInStorage,
  removeAllTodosFromStorage,
} from '../../helper/storage'
import { AnimatePresence } from 'framer-motion'
import { Todo, TodoProps } from '../../components/Todo'
import { DeleteTaskDialog } from '../../components/DeleteTaskDialog'
import { EmptyContainer } from '../../components/EmptyContainer'
import { slugify } from '../../helper/util'
import { AppInfoContext } from '../../helper/context'

export function HomePage() {
  const [todos, setTodos] = useState<TodoProps[]>(getAllTodosFromStorage())
  const { updateAppTotals } = useContext(AppInfoContext)

  // useEffect(() => {
  //   updateAppTotals()
  // }, [])

  const addtodo = (title: string) => {
    const newTodo: TodoProps = {
      id: uid(),
      title,
      slug: slugify(title),
      date: new Date(),
      numberOftasks: 0,
      numberOfDoneTasks: 0,
    }

    const slugExists = todos.find((todo) => todo.slug === newTodo.slug)

    if (slugExists) {
      toast.error('This todo title has already been used.')
      return
    }

    setTodos((prevTodos) => {
      const data = [...prevTodos, newTodo]
      updateTodosInStorage(data)
      updateAppTotals()
      return data
    })
  }

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todoItem) => todoItem.id !== id)
      updateTodosInStorage(newTodos)
      removeAllTodoTasksfromStorage(id)
      updateAppTotals()
      return newTodos
    })
  }

  const removeAllTodos = () => {
    todos.forEach((todo) => {
      removeAllTodoTasksfromStorage(todo.id)
    })
    setTodos([])
    removeAllTodosFromStorage()
    updateAppTotals()
  }
  const renderTodos = () => {
    if (todos.length === 0) {
      return (
        <EmptyContainer
          title="No todo list yet"
          subTitle="Create yor first todo list."
        />
      )
    }
    return (
      <AnimatePresence>
        {todos.map((todo) => {
          return <Todo removeTodo={removeTodo} todo={todo} key={todo.id} />
        })}
      </AnimatePresence>
    )
  }

  return (
    <HomePageContainer>
      <div className="content">
        <FormInput placeholder="Add new todo list" addAction={addtodo} />
        <div className="header-container">
          {todos.length > 0 && (
            <DeleteTaskDialog
              title="Remove all todo lists"
              question="Are you sure you want to remove all todo lists?"
              onSuccess={removeAllTodos}
              buttonLabel="Remove all"
            />
          )}
        </div>
        <div className="list-container">{renderTodos()}</div>
      </div>
    </HomePageContainer>
  )
}
