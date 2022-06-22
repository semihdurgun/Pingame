import { createSlice } from '@reduxjs/toolkit'

const boardDefault = [
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
  [
      "",
      "",
      "",
      "",
  ],
];
var hintDefault = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
  ]
const initialState = { guessedNumberCount: 4, attempt: 0, letter: 0, board2: boardDefault, hint: hintDefault, correctNumber: "", gameOver: false, guessedWord: false, timer_end:false }

const GameSlicer = createSlice({
  name: 'GameOver',
  initialState,
  reducers: {
    curr_attempt(state, action) {
      state.attempt = action.payload.attempt
      state.letter = action.payload.letter
    },
    correct_number(state, action) {
      state.correctNumber = action.payload
    },
    board2(state, action) {
      state.board2 = action.payload
    },
    game_over(state, action) {
      state.gameOver = action.payload.gameOver
      state.guessedWord = action.payload.guessedWord
      state.timer_end = action.payload.timer_end
    },
    hint(state, action) {
      state.hint = action.payload
    },
    guessed_number_count(state, action) {
      state.hint = action.payload
    },
  },
})

export const { curr_attempt, correct_number, board2, game_over, hint } = GameSlicer.actions
export default GameSlicer.reducer