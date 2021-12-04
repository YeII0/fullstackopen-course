import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote({
      content,
      votes: 0
    })
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const makeVote_old = id => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const makeVote = anecdote => {
  return async dispatch => {
    const anecdoteToChange = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const changedAnecdote = await anecdoteService.updateAnecdote(
      anecdote.id, anecdoteToChange
    )
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = state.map(anecdote => {
        return anecdote.id !== action.data.id
          ? anecdote
          : action.data
      })
      return newState
    case 'NEW_ANECDOTE':
      console.log('switch NEW_ANECTODE fired');
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer