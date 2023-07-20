import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { CountdownContainer } from './styles'
import { Cycle } from '../../../../@types/cycle'
import { useDispatch, useSelector } from 'react-redux'
import { reducerStateType } from '../../../../redux/store'
import {
  markCurrentCycleAsFinished,
  setSecondsPassed,
} from '../../../../redux/reducers/cycleSlice'
import { TodoType } from '../../../../@types/todo'

export function Countdown({ isMinimal = false }) {
  const dispatch = useDispatch()

  const activeCycle = useSelector(
    (state: reducerStateType) =>
      state.cycles.activeCycleId &&
      state.cycles.cycles.find(
        (cycle: Cycle) => cycle.id === state.cycles.activeCycleId,
      ),
  )

  const activeTaskId = useSelector(
    (state: reducerStateType) => state.cycles.activeTaskId,
  )

  const activeTodo = useSelector((state: reducerStateType) =>
    state.todos.todos.find((todo: TodoType) =>
      todo.tasks.find((task) => task.id === activeTaskId),
    ),
  )
  const activeTask = activeTodo?.tasks.find((task) => task.id === activeTaskId)

  const amountSecondsPassed = useSelector(
    (state: reducerStateType) => state.cycles.amountSecondsPassed,
  )

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          dispatch(markCurrentCycleAsFinished())
          dispatch(setSecondsPassed({ secondsPassed: totalSeconds }))
          clearInterval(interval)
        } else {
          dispatch(setSecondsPassed({ secondsPassed: secondsDifference }))
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, dispatch])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <>
      {activeTodo && activeTask && !isMinimal && (
        <h3>
          Working on {activeTask.title} - {activeTodo.title}
        </h3>
      )}
      <CountdownContainer className={`${isMinimal ? 'is-minimal' : ''}`}>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <div className={`separator  ${!!activeCycle && 'is-running'}`}>:</div>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
    </>
  )
}
