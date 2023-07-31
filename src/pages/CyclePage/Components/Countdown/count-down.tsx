import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { CountdownContainer } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { reducerStateType } from '../../../../redux/store'
import {
  markCurrentCycleAsFinished,
  selectActiveCycle,
  selectActiveTaskId,
  selectAmountSecondsPassed,
  setSecondsPassed,
} from '../../../../redux/reducers/cycleSlice'
import { selectActiveTodoByTaskId } from '../../../../redux/reducers/todoSlice'

export function Countdown({ isMinimal = false }) {
  const dispatch = useDispatch()

  const activeCycle = useSelector(selectActiveCycle)
  const activeTaskId = useSelector(selectActiveTaskId)
  const activeTodo = useSelector((state: reducerStateType) =>
    selectActiveTodoByTaskId(state, activeTaskId),
  )
  const activeTask = activeTodo?.tasks.find((task) => task.id === activeTaskId)

  const amountSecondsPassed = useSelector(selectAmountSecondsPassed)

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
    if (activeCycle && activeTask && activeTodo) {
      document.title = ` ${activeTask.title} - ${activeTodo.title} ${minutes}:${seconds}`
    } else if (!activeCycle) {
      document.title = `TODO + React + TS`
    }
  }, [minutes, seconds, activeCycle, activeTask, activeTodo])

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
