import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedTodoReducer = persistReducer(persistConfig, todoReducer)

export const store = configureStore({
  reducer: persistedTodoReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)
