const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE': {
      const noteToChange = state.find(note => note.id === action.data.id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      const newState = state.map(note => {
        return note.id !== action.data.id
          ? note
          : changedNote
      })
      return newState
    }
    default:
      return state
  }
}

export default noteReducer