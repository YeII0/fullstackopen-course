import React from 'react'

const Notification = ({ message, messageType }) => {
  const notificationStyles = {
    base: {
      fontSize: 18,
      padding: 20,
      borderStyle: 'solid',
      borderWidth: 4,
      borderRadius: 5,
      borderColor: 'black',
      background: 'lightgrey',
      marginBottom: 10,
    },
    success: {
      color: 'green',
      borderColor: 'green'
    },
    error: {
      color: 'red',
      borderColor: 'red'
    }
  }

  if (message && messageType) {
    return (
      <div className="notification" style={{
        ...notificationStyles.base,
        ...notificationStyles[messageType]
      }}>
        {message}
      </div >
    )
  }
  return null
}

export default Notification