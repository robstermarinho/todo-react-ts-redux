import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoSlice'
import cycleReducer from './reducers/cycleSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { TodosState } from '../@types/todo'
import { CyclesState } from '../@types/cycle'

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

export interface reducerStateType {
  todos: TodosState
  cycles: CyclesState
}

export const store = configureStore({
  reducer: {
    todos: persistedTodoReducer,
    cycles: persistedCycleReducer,
  },
  middleware: [thunk],
})

export const persistor = persistStore(store)
