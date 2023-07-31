import { createSlice } from '@reduxjs/toolkit'
import { CyclesState } from '../../@types/cycle'
import { v4 as uid } from 'uuid'
import { reducerStateType } from '../store'
import { TaskProps, TaskType } from '../../@types/todo'

export const initialCycleState: CyclesState = {
  cycles: [],
  activeCycleId: null,
  activeTaskId: null,
  amountSecondsPassed: 0,
}
export const cycleSlice = createSlice({
  name: 'cycle',
  initialState: initialCycleState,
  reducers: {
    addNewCycle: (state, action) => {
      const { taskId, minutesAmount } = action.payload

      const newCycle = {
        id: uid(),
        taskId,
        minutesAmount,
        startDate: new Date(),
      }
      state.cycles.push(newCycle)
      state.activeCycleId = newCycle.id
      state.activeTaskId = taskId
      state.amountSecondsPassed = 0
    },
    interruptCurrentCycle: (state) => {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }
      state.cycles[currentCycleIndex].interruptedDate = new Date()
      state.activeCycleId = null
      state.activeTaskId = null
      state.amountSecondsPassed = 0
    },

    markCurrentCycleAsFinished: (state) => {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }
      state.cycles[currentCycleIndex].finishedDate = new Date()
      state.activeCycleId = null
      state.activeTaskId = null
    },
    removeAllPreviousCycles: (state) => {
      state.cycles = []
      state.activeCycleId = null
      state.activeTaskId = null
      state.amountSecondsPassed = 0
    },
    setSecondsPassed: (state, action) => {
      const { secondsPassed } = action.payload
      state.amountSecondsPassed = secondsPassed
    },
  },
})

/**
 * Actions
 */

export const {
  addNewCycle,
  interruptCurrentCycle,
  markCurrentCycleAsFinished,
  setSecondsPassed,
  removeAllPreviousCycles,
} = cycleSlice.actions

/**
 * Selectors
 */

export const selectNumberOfPreviousCycles = (state: reducerStateType) =>
  state.cycles.cycles.length

export const selectActiveCycleId = (state: reducerStateType) =>
  state.cycles.activeCycleId

export const selectActiveCycle = (state: reducerStateType) =>
  state.cycles.activeCycleId &&
  state.cycles.cycles.find((cycle) => cycle.id === state.cycles.activeCycleId)

export const selectActiveTaskId = (state: reducerStateType) =>
  state.cycles.activeTaskId

export const selectIsTaskInActiveCycle = (
  state: reducerStateType,
  task: TaskType,
) => {
  return state.cycles.activeTaskId === task.id
}

export const selectAmountSecondsPassed = (state: reducerStateType) =>
  state.cycles.amountSecondsPassed

export const selecTaskCycles = (state: reducerStateType, task: TaskType) => {
  return state.cycles.cycles.filter((cycle) => cycle.taskId === task.id)
}

export default cycleSlice.reducer
