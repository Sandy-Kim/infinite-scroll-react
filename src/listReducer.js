import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
  name: 'listReducer',
  initialState: {number: 1, list: [1]},
  reducers: {
    add: (state, action) => {
      const newNumber = action.payload;
      return {
        number: newNumber,
        list: [...state.list, newNumber]
      }
    }
  }
})

export const { add } = listSlice.actions;

export default listSlice.reducer;
