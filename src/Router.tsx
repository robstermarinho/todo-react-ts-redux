import { Routes, Route } from 'react-router-dom'
import { TodoDetails } from './pages/TodoDetails'
import { DefaultLayout } from './layouts/DefaultLayout'
import { HomePage } from './pages/HomePage'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo/:slug/" element={<TodoDetails />} />
      </Route>
    </Routes>
  )
}
