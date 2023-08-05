import { createContext, useCallback, useEffect, useState } from 'react'
import { api } from '../services/axios'

interface Post {
  id: string
  title: string
  body: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

interface PostInput {
  title: string
  body: string
}

interface PostsContextProps {
  posts: Post[]
  status: 'idle' | 'loading' | 'error'
  error: string | null
  fetchPosts: (query?: string) => Promise<void>
  createPost: (data: PostInput) => Promise<void>
  updatePost: (data: PostInput) => Promise<void>
  publishPost: (id: string) => Promise<void>
  unpublishPost: (id: string) => Promise<void>
  deletePost: (id: string) => Promise<void>
}

interface PostsProviderProps {
  children: React.ReactNode
}

export const PostsContext = createContext({} as PostsContextProps)

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch posts
   * @param query
   */
  const fetchPosts = useCallback(async (query?: string) => {
    setStatus('loading')
    setError(null)
    try {
      const response = await api.get('posts', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      })
      setPosts(response.data)
      setStatus('idle')
      setError(null)
    } catch (e) {
      setStatus('error')
      setError('Impossible to load posts.')
    }
  }, [])

  /**
   * Create post
   * @param data
   */
  const createPost = useCallback(async (data: PostInput) => {
    const { title, body } = data
    const response = await api.post('posts', {
      title,
      body,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    setPosts((state) => [response.data, ...state])
  }, [])

  /**
   * Update post
   * @param data
   */
  const updatePost = useCallback(async (data: PostInput) => {
    const { title, body } = data
    const response = await api.put(`posts/${data.id}`, {
      title,
      body,
      updatedAt: new Date(),
    })
    setPosts((state) => [response.data, ...state])
  }, [])

  /**
   * Publish post
   * @param id
   */
  const publishPost = useCallback(async (id: string) => {
    await api.put(
      `posts/${id}
    `,
      {
        isPublished: true,
      },
    )
    setPosts((state) =>
      state.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            isPublished: true,
          }
        }
        return post
      }),
    )
  }, [])

  /**
   * Unpublish post
   * @param id
   */
  const unpublishPost = useCallback(async (id: string) => {
    await api.put(
      `posts/${id}
    `,
      {
        isPublished: false,
      },
    )
    setPosts((state) =>
      state.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            isPublished: false,
          }
        }
        return post
      }),
    )
  }, [])

  const deletePost = useCallback(async (id: string) => {
    await api.delete(`posts/${id}`)
    setPosts((state) => state.filter((post) => post.id !== id))
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <PostsContext.Provider
      value={{
        posts,
        status,
        error,
        fetchPosts,
        createPost,
        updatePost,
        publishPost,
        unpublishPost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
