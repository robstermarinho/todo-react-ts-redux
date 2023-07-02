import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { AppInfoContext, initialInfo, AppInfoProps } from './helper/context'
import { useEffect, useState } from 'react'
import { getAllTodosFromStorage } from './helper/storage'
import { TodoProps } from './components/Todo'

function App() {
  const [info, setInfo] = useState<AppInfoProps>(initialInfo)

  const updateAppTotals = () => {
    const todos = getAllTodosFromStorage()

    const totalOfCompletedTodoLists = todos.reduce(
      (acc: number, todo: TodoProps) => {
        if (
          todo.numberOfDoneTasks === todo.numberOftasks &&
          todo.numberOfDoneTasks > 0
        ) {
          return acc + 1
        }
        return acc
      },
      0,
    )

    const totalNumberOfTasks = todos.reduce((acc: number, todo: TodoProps) => {
      return acc + todo.numberOftasks
    }, 0)

    const totalNumberOfCompletedTasks = todos.reduce(
      (acc: number, todo: TodoProps) => {
        return acc + todo.numberOfDoneTasks
      },
      0,
    )

    setInfo({
      ...info,
      total: todos.length,
      totalCompleted: totalOfCompletedTodoLists,
      totalTasks: totalNumberOfTasks,
      totalTasksCompleted: totalNumberOfCompletedTasks,
    })
  }

  useEffect(() => {
    updateAppTotals()
  }, [])

  return (
    <AppInfoContext.Provider
      value={{
        info,
        updateAppTotals,
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'theme'}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </StyleSheetManager>
      </ThemeProvider>
    </AppInfoContext.Provider>
  )
}

export default App
