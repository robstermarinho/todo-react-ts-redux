import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { Post } from '../../contexts/PostsContext'
import { api } from '../../services/axios'
import { reducerStateType } from '../store'

export interface PostsState {
  posts: Post[]
  status: 'idle' | 'loading' | 'error' | 'deleting' | 'creating' | 'updating'
  error: string | null
}

export const initialPostsReducerState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

export interface PostsFetchParams {
  isPublished: boolean
  query: string | null
}

/**
 * Fetch posts with async thunk
 * @param isPublished
 * @param query
 */
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (data: PostsFetchParams) => {
    const response = await api.get('posts', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        isPublished: data.isPublished,
        q: data.query ?? null,
      },
    })
    return response.data
  },
)
export type FetchPostsAction = ReturnType<typeof fetchPosts>

/**
 * Delete post with async thunk
 */
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId: string) => {
    await api.delete(`posts/${postId}`)
    return postId
  },
)
export type DeletePostAction = ReturnType<typeof deletePost>

export const postSlice = createSlice({
  name: 'post',
  initialState: initialPostsReducerState,
  reducers: {
    // Middleware thunk reducers
    syncPosts: (state: PostsState, action) => {
      state.status = 'idle'
      state.posts = action.payload
      state.error = null
    },
    setIsLoading: (state: PostsState) => {
      state.status = 'loading'
      state.error = null
    },
    setIsError: (state: PostsState, action) => {
      state.status = 'error'
      state.error = action.payload
      state.posts = []
    },
  },

  // Async thunk extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state: PostsState, action) => {
        state.status = 'idle'
        state.posts = action.payload
        state.error = null
      })
      .addCase(fetchPosts.rejected, (state: PostsState) => {
        state.status = 'error'
        state.error = 'Impossible to load posts now.'
        state.posts = []
      })

      .addCase(deletePost.pending, (state: PostsState) => {
        state.status = 'deleting'
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state: PostsState, action) => {
        state.status = 'idle'
        state.error = null
        state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
      .addCase(deletePost.rejected, (state: PostsState) => {
        state.status = 'error'
        state.error = 'Impossible to delete post now.'
      })
  },
})

/**
 * Actions
 */
export const { syncPosts, setIsLoading, setIsError } = postSlice.actions

/**
 * Selectors
 */
export const selectPostsStatus = (state: reducerStateType) => state.posts.status
export const selectPosts = (state: reducerStateType) => state.posts.posts
export const selectPostsError = (state: reducerStateType) => state.posts.error

// Memorized version of selectPosts
export const selecPostsLength = createSelector(
  selectPosts,
  (posts) => posts.length,
)

export default postSlice.reducer
