import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { getAppTotalsFromStorage } from '../helper/storage'
import { AppInfoContext, AppInfoProps } from '../helper/context'

export function DefaultLayout() {
  const [info, setInfo] = useState<AppInfoProps>(getAppTotalsFromStorage())

  const updateAppTotals = () => {
    setInfo(getAppTotalsFromStorage())
  }

  return (
    <div>
      <AppInfoContext.Provider
        value={{
          info,
          updateAppTotals,
        }}
      >
        <Header />
        <Outlet />
      </AppInfoContext.Provider>
      <ToastContainer theme="dark" closeOnClick />
    </div>
  )
}
