import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <ToastContainer theme="dark" closeOnClick />
    </div>
  )
}
