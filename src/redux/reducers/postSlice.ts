import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

export const postSlice = createSlice({
  name: 'post',
  initialState: initialPostsReducerState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostsState, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state: PostsState, action) => {
        state.status = 'idle'
        state.posts = action.payload
        state.error = null
      })
      .addCase(fetchPosts.rejected, (state: PostsState, action) => {
        state.status = 'error'
        state.error = 'Impossible to load posts now.'
        state.posts = []
      })
  },
})

/**
 * Selectors
 */

export const selectPostsStatus = (state: reducerStateType) => state.posts.status
export const selectPosts = (state: reducerStateType) => state.posts.posts
export const selectPostsError = (state: reducerStateType) => state.posts.error

export default postSlice.reducer
