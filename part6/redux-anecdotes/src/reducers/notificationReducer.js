const initialState = {
  message: '',
  timeoutId: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      clearTimeout(state.timeoutId)
      return {
        ...state,
        message: action.data
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        message: ''
      }
    case 'SET_TIMEOUT_ID':
      return {
        ...state,
        timeoutId: action.data
      }
    default:
      return state
  }
}

export const createNotification = (message, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: message
    })
    const timeoutId = setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION'
    }), displayTime)

    dispatch({
      type: 'SET_TIMEOUT_ID',
      data: timeoutId
    })
  }
}

export default notificationReducer