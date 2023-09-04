import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoSlice'
import cycleReducer from './reducers/cycleSlice'
import postReducer, { PostsState } from './reducers/postSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { TodosState } from '../@types/todo'
import { CyclesState } from '../@types/cycle'
import { apiSlice } from './reducers/apiSlice'

const persistedTodoReducer = persistReducer(
  {
    key: 'todos',
    storage,
  },
  todoReducer,
)

const persistedCycleReducer = persistReducer(
  {
    key: 'cycles',
    storage,
  },
  cycleReducer,
)

const persistedPostReducer = persistReducer(
  {
    key: 'posts',
    storage,
  },
  postReducer,
)

export interface reducerStateType {
  todos: TodosState
  cycles: CyclesState
  posts: PostsState
}

export const store = configureStore({
  reducer: {
    todos: persistedTodoReducer,
    cycles: persistedCycleReducer,
    posts: persistedPostReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: [thunk, apiSlice.middleware],
})

export const persistor = persistStore(store)
