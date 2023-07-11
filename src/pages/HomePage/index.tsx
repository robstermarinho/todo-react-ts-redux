import { FormInput } from '../../components/FormInput'
import { HomePageContainer } from './styles'
import { AnimatePresence } from 'framer-motion'
import { Todo } from '../../components/Todo'
import { DeleteTaskDialog } from '../../components/DeleteTaskDialog'
import { EmptyContainer } from '../../components/EmptyContainer'
import { TodoType, TodosState } from '../../@types/todo'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  removeTodo,
  removeAllTodos,
} from '../../redux/reducers/todoSlice'
import { slugify } from '../../helper/util'
import { toast } from 'react-toastify'

export function HomePage() {
  const todos = useSelector((state: TodosState) => state.todos)
  const dispatch = useDispatch()

  const handleAddTodo = (title: string) => {
    const slug = slugify(title)

    const slugExists = todos.find((todo: TodoType) => todo.slug === slug)

    if (slugExists) {
      toast.error('This todo title has already been used.')
      return
    }
    dispatch(addTodo({ title, slug }))
  }

  const handleRemoveTodo = (todoId: string) => {
    if (!todoId) {
      toast.error('Todo not found!')
      return
    }
    dispatch(removeTodo({ todoId }))
  }

  const handleRemoveAllTodos = () => {
    dispatch(removeAllTodos())
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
