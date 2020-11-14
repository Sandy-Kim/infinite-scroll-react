import { configureStore } from '@reduxjs/toolkit'
import listReducer from './listReducer'

const store = configureStore({
  reducer: listReducer,
})

export default store;
