import { ListChecks } from 'phosphor-react'
import { TodoContainer } from './styles'
import { DeleteTaskDialog } from '../DeleteTaskDialog'
import { Link } from 'react-router-dom'
import { motionVariants } from '../../helper/variants'
import { Info } from '../Info'

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
  removeTodo: (id: string) => void
}

export function Todo({ todo, removeTodo }: TodoDataProps) {
  const isClompleted: boolean =
    todo.numberOfDoneTasks === todo.numberOftasks && todo.numberOftasks > 0
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

          <div className="todo-info-small">
            <Info
              title={isClompleted ? 'Completed' : 'In progress'}
              amount={`${todo.numberOfDoneTasks} of ${todo.numberOftasks}`}
              purple={isClompleted}
            />
          </div>

          <small>
            {new Date(todo.date).toLocaleDateString()}{' '}
            {new Date(todo.date).toLocaleTimeString()}{' '}
          </small>
        </div>
      </Link>

      <DeleteTaskDialog
        onSuccess={() => removeTodo(todo.id)}
        title="Remove Todo"
        question="Are you sure you want to remove this todo list?"
        targetName={todo.title}
      />
    </TodoContainer>
  )
}
