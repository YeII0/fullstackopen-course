const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return state.data
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = ({ message, messageType }) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: { message, messageType }
  }
}

export default notificationReducer