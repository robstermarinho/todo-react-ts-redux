import { createContext } from 'react'

export interface AppInfoProps {
  total: number
  totalCompleted: number
  totalTasks: number
  totalTasksCompleted: number
}

export const initialInfo: AppInfoProps = {
  total: 0,
  totalCompleted: 0,
  totalTasks: 0,
  totalTasksCompleted: 0,
}

interface AppInfoContextType {
  info: AppInfoProps
  updateAppTotals: () => void
}

export const AppInfoContext = createContext({} as AppInfoContextType)
