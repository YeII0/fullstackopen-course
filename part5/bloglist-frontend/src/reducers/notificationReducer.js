const initialState = {
  message: '',
  messageType: '',
  timeoutId: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      clearTimeout(state.timeoutId)
      return {
        ...state,
        message: action.data.message,
        messageType: action.data.messageType
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        message: '',
        messageType: ''
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

export const createNotification = ({ message, messageType, displayTime }) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: {
        message,
        messageType
      }
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

export default reducer