import { createSlice } from '@reduxjs/toolkit'

const initialState = { language: "en", render: "" }

const Site = createSlice({
  name: 'Site',
  initialState,
  reducers: {
    render(state, action) {
      state.render = action.payload
    },
    language(state, action) {
      state.language = action.payload
    },
  },
})

export const { language,render } = Site.actions
export default Site.reducer