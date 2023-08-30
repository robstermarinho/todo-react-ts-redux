import { Routes, Route } from 'react-router-dom'
import { TodoDetails } from './pages/TodoDetails'
import { DefaultLayout } from './layouts/DefaultLayout'
import { HomePage } from './pages/HomePage'
import { CyclePage } from './pages/CyclePage'
import { BlogPage } from './pages/BlogPage'
import { PostsProvider } from './contexts/PostsContext'
import { BlogReduxPage } from './pages/BlogPage/BlogReduxPage'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo/:slug/" element={<TodoDetails />} />
        <Route path="/todo/:slug/cycle" element={<CyclePage />} />
        <Route
          path="/blog"
          element={
            <PostsProvider>
              <BlogPage />
            </PostsProvider>
          }
        />
        <Route path="redux/blog" element={<BlogReduxPage />} />
      </Route>
    </Routes>
  )
}
