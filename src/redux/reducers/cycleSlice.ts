import { createSlice } from '@reduxjs/toolkit'
import { CyclesState } from '../../@types/cycle'
import { v4 as uid } from 'uuid'

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

export const {
  addNewCycle,
  interruptCurrentCycle,
  markCurrentCycleAsFinished,
  setSecondsPassed,
  removeAllPreviousCycles,
} = cycleSlice.actions

export default cycleSlice.reducer
