import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)

    const message = 'new note has been added'
    props.createNotification(message, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input type="text" name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

const ConnectedNewAnecdote = connect(
  null,
  { createNotification, createAnecdote }
)(NewAnecdote)

export default ConnectedNewAnecdote