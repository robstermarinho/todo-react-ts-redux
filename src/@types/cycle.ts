export interface Cycle {
  id: string
  taskId: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
  activeTaskId: string | null
  amountSecondsPassed: number
}
