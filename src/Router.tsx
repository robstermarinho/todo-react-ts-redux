import { Routes, Route } from 'react-router-dom'
import { TodoDetails } from './pages/TodoDetails'
import { DefaultLayout } from './layouts/DefaultLayout'
import { HomePage } from './pages/HomePage'
import { CyclePage } from './pages/CyclePage'
import { BlogPage } from './pages/BlogPage'
import { PostsProvider } from './contexts/PostsContext'
import { BlogReduxPage } from './pages/BlogPage/BlogReduxPage'
import { BlogRTKPage } from './pages/BlogPage/BlogRTKPage'

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
        <Route path="rtk/blog" element={<BlogRTKPage />} />
      </Route>
    </Routes>
  )
}
