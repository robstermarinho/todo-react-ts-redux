import { useState } from 'react'
import { FormInput } from '../../components/FormInput'
import { EmptyTask } from '../../components/Task'
import { HomePageContainer } from './styles'
import { v4 as uid } from 'uuid'
import { toast } from 'react-toastify'
import {
  storeInStorage,
  getFromStorage,
  clearKeyFromStorage,
} from '../../helper/storage'
import { AnimatePresence } from 'framer-motion'
import { Todo, TodoProps } from '../../components/Todo'

function slugify(str = '') {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return str
}

export function HomePage() {
  const [todos, setTodos] = useState<TodoProps[]>(
    getFromStorage({
      key: 'todos',
    }) || [],
  )

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
      const finalResult = [...prevTodos, newTodo]
      storeInStorage({ key: 'todos', value: finalResult })
      return finalResult
    })
  }

  const renderTodos = () => {
    if (todos.length === 0) {
      return <EmptyTask />
    }
    return (
      <AnimatePresence>
        {todos.map((todo) => {
          return <Todo todo={todo} key={todo.id} />
        })}
      </AnimatePresence>
    )
  }
  const removeAllTodos = () => {
    // Clear all todo tasks from storage
    todos.forEach((todo) => {
      const storageKey = `${todo.slug}/tasks`
      clearKeyFromStorage({ key: storageKey })
    })
    setTodos([])
    storeInStorage({ key: 'todos', value: [] })
  }

  return (
    <HomePageContainer>
      <div className="content">
        <FormInput placeholder="Add new todo list" addAction={addtodo} />
        <div className="header-container">
          {todos.length > 0 && <a onClick={removeAllTodos}>Remove all</a>}
        </div>
        <div className="list-container">{renderTodos()}</div>
      </div>
    </HomePageContainer>
  )
}
