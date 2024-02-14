import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL'){
      return state.anecdotes
    }
    const byFilterField =
            a => a.content.toLowerCase().includes(state.filter.toLowerCase())
    return state.anecdotes.filter(byFilterField)
  })
  const dispatch = useDispatch()
  
  const byVotes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
    {anecdotes.sort(byVotes).map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(vote(anecdote.id))}
      />
    )}
    </div>
  )
}

export default AnecdoteList
