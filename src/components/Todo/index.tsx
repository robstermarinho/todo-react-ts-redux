import { ListChecks } from 'phosphor-react'
import { TodoContainer } from './styles'
import { DeleteTaskDialog } from '../DeleteTaskDialog'
import { Link } from 'react-router-dom'
import { motionVariants } from '../../helper/variants'
import { Info } from '../Info'
import { formatDistanceToNow } from 'date-fns'
import { TodoType } from '../../@types/todo'

interface TodoProps {
  todo: TodoType
  removeTodo: (id: string) => void
}

export function Todo({ todo, removeTodo }: TodoProps) {
  const numberOfTasks = todo.tasks.length
  const numberOfDoneTasks = todo.tasks.filter((task) => task.isDone).length
  const isClompleted: boolean =
    numberOfDoneTasks === numberOfTasks && numberOfDoneTasks > 0

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
              amount={`${numberOfDoneTasks} of ${numberOfTasks}`}
              purple={isClompleted}
            />
          </div>

          <small>
            {formatDistanceToNow(new Date(todo.date), { addSuffix: true })}
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
