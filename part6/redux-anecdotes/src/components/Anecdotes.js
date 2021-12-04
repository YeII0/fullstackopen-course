import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { makeVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = (filter !== '')
      ? anecdotes.filter(anecdote => anecdote.content.includes(filter))
      : anecdotes
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(makeVote(anecdote))

    const message = `you voted for '${anecdote.content}'`
    props.createNotification(message, 5000)
  }

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const ConnectedAnecdotes = connect(
  null,
  { createNotification }
)(Anecdotes)
export default ConnectedAnecdotes