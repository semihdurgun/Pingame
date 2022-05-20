import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: "en" }

const Site = createSlice({
  name: 'Site',
  initialState,
  reducers: {
    language(state, action) {
      state.value = action.payload
    },
  },
})

export const { language } = Site.actions
export default Site.reducer