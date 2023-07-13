import { TodoType } from '../../../../@types/todo'
import { FormContainer, MinutesAmountInput, TaskOptions } from './styles'
import { useFormContext } from 'react-hook-form'

export interface NewCycleFormData {
  todo: TodoType | undefined
}
export function NewCycleForm({ todo }: NewCycleFormData) {
  const activeCycle = null
  const { register } = useFormContext()
  const notIsDoneTodoTasks = todo?.tasks.filter((task) => !task.isDone)

  return (
    <FormContainer>
      <label htmlFor="task"> Working on</label>

      <TaskOptions
        {...register('task')}
        disabled={!!activeCycle}
        id="task"
        placeholder="Task name"
      >
        {notIsDoneTodoTasks?.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </TaskOptions>

      <label htmlFor="minutesAmount"> for</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
