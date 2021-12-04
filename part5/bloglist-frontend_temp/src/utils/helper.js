const showNotification = (
  setMessage,
  setMessageType,
  message,
  messageType,
  showDuration
) => {
  setMessage(message)
  setMessageType(messageType)
  setTimeout(() => {
    setMessage('')
    setMessageType('')
  }, showDuration)
}

const exportedObjects = { showNotification }

export default exportedObjects