import { createContext, useCallback, useState } from 'react'
import { getAppTotalsFromStorage } from './storage'

export interface AppInfoProps {
  total: number
  totalCompleted: number
  totalTasks: number
  totalTasksCompleted: number
}

interface AppInfoContextType {
  info: AppInfoProps
  updateAppTotals: () => void
}

interface AppInfoContextProviderProps {
  children: React.ReactNode
}

export const AppInfoContext = createContext({} as AppInfoContextType)

export function AppInfoContextProvider({
  children,
}: AppInfoContextProviderProps) {
  const [info, setInfo] = useState<AppInfoProps>(getAppTotalsFromStorage())

  const updateAppTotals = useCallback(() => {
    setInfo(getAppTotalsFromStorage())
  }, [])

  return (
    <AppInfoContext.Provider
      value={{
        info,
        updateAppTotals,
      }}
    >
      {children}
    </AppInfoContext.Provider>
  )
}
