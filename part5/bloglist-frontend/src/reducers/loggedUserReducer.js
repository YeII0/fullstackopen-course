const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const removeUser = () => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export default reducer