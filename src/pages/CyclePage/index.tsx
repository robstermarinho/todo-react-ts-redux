import { ArrowCircleLeft, HandPalm, Play, Trash } from 'phosphor-react'
import {
  CycleContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Countdown } from './Components/Countdown/count-down'
import { NewCycleForm } from './Components/NewCycleForm/new-cicle'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { reducerStateType } from '../../redux/store'
import { TodoType } from '../../@types/todo'
import {
  addNewCycle,
  interruptCurrentCycle,
  removeAllPreviousCycles,
} from '../../redux/reducers/cycleSlice'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'The task is required.'),
  minutesAmount: zod
    .number()
    .min(1, 'The cycle must be at least 1 minute.')
    .max(60, 'The cycle must be at most 60 minutes.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function CyclePage() {
  const params = useParams()
  const slug = params.slug || ''
  const dispatch = useDispatch()

  const todo = useSelector((state: reducerStateType) =>
    state.todos.todos.find((todo: TodoType) => todo.slug === slug),
  )

  const activeCycle = useSelector(
    (state: reducerStateType) =>
      state.cycles.activeCycleId &&
      state.cycles.cycles.find(
        (cycle) => cycle.id === state.cycles.activeCycleId,
      ),
  )

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const numberOfPreviousCycles = useSelector(
    (state: reducerStateType) => state.cycles.cycles.length,
  )

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    dispatch(
      addNewCycle({
        taskId: data.task,
        minutesAmount: data.minutesAmount,
      }),
    )
    reset()
  }
  function handleInterruptCurrentCycle() {
    dispatch(interruptCurrentCycle())
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <CycleContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm todo={todo} />
        </FormProvider>
        <div className="todoHeader">
          <NavLink to={`/todo/${slug}`} className="backLink">
            <ArrowCircleLeft />
            <span>Back </span>
          </NavLink>

          {numberOfPreviousCycles > 0 && (
            <a
              className="removeAllCycles"
              onClick={() => dispatch(removeAllPreviousCycles())}
            >
              <Trash />
              Clear {numberOfPreviousCycles} cycles from history
            </a>
          )}
        </div>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            onClick={handleInterruptCurrentCycle}
            type="button"
          >
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </CycleContainer>
  )
}
