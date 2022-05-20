import { configureStore } from '@reduxjs/toolkit'
import siteReducer from './stores/Site'
import GameReducer from './stores/GameSlicer'

export default configureStore({
  reducer: {
    site: siteReducer,
    game:GameReducer
  },
})