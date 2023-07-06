import { useContext } from 'react'
import { FormInput } from '../../components/FormInput'
import { HomePageContainer } from './styles'
import { AnimatePresence } from 'framer-motion'
import { Todo } from '../../components/Todo'
import { DeleteTaskDialog } from '../../components/DeleteTaskDialog'
import { EmptyContainer } from '../../components/EmptyContainer'
import { AppInfoContext } from '../../helper/context'

export function HomePage() {
  const { todos, addTodo, removeTodoById, removeAllTheTodos } =
    useContext(AppInfoContext)

  const handleAddTodo = (title: string) => {
    addTodo(title)
  }

  const handleRemoveTodo = (todoId: string) => {
    removeTodoById(todoId)
  }

  const handleRemoveAllTodos = () => {
    removeAllTheTodos()
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
          return (
            <Todo removeTodo={handleRemoveTodo} todo={todo} key={todo.id} />
          )
        })}
      </AnimatePresence>
    )
  }

  return (
    <HomePageContainer>
      <div className="content">
        <FormInput placeholder="Add new todo list" addAction={handleAddTodo} />
        <div className="header-container">
          {todos.length > 0 && (
            <DeleteTaskDialog
              title="Remove all todo lists"
              question="Are you sure you want to remove all todo lists?"
              onSuccess={handleRemoveAllTodos}
              buttonLabel="Remove all"
            />
          )}
        </div>
        <div className="list-container">{renderTodos()}</div>
      </div>
    </HomePageContainer>
  )
}
