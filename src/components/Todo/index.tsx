import { ListChecks } from 'phosphor-react'
import { TodoContainer } from './styles'
import { DeleteTaskDialog } from '../DeleteTaskDialog'
import { Link } from 'react-router-dom'
import { motionVariants } from '../../helper/variants'

export interface TodoProps {
  id: string
  title: string
  slug: string
  date: Date
  numberOftasks: number
  numberOfDoneTasks: number
}

interface TodoDataProps {
  todo: TodoProps
}

export function Todo({ todo }: TodoDataProps) {
  return (
    <TodoContainer
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      variants={motionVariants}
    >
      <Link to={`/todo/${todo.slug}`}>
        <ListChecks size={50} weight="thin" />

        <div className="todo-info">
          <h4>{todo.title}</h4>
          <h5>
            Done {todo.numberOfDoneTasks} of {todo.numberOftasks}
          </h5>

          <small>
            {new Date(todo.date).toLocaleDateString()}{' '}
            {new Date(todo.date).toLocaleTimeString()}{' '}
          </small>
        </div>
      </Link>

      <DeleteTaskDialog
        onSuccess={() => alert(todo.id)}
        title="Remove Todo"
        question="Are you sure you want to remove this todo list?"
        targetName={todo.title}
      />
    </TodoContainer>
  )
}
