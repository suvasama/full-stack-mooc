import { combineReducers } from 'redux'

import filterReducer from './filterReducer'
import anecdoteReducer from './anecdoteReducer'

const reducer = combineReducers({
  notes: anecdoteReducer,
  filter: filterReducer
})

export default reducer