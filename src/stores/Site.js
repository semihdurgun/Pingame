import { createSlice } from '@reduxjs/toolkit'

const initialState = { language: "en", nickname: "" }

const Site = createSlice({
  name: 'Site',
  initialState,
  reducers: {
    language(state, action) {
      state.language = action.payload
    },
    
  },
})

export const { language } = Site.actions
export default Site.reducer