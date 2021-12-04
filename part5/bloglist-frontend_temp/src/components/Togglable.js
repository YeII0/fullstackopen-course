import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { setVisible }
  })

  if (!visible) {
    return (
      <button className="showButton" onClick={() => setVisible(true)}>
        {props.label}
      </button>
    )
  }
  return (
    <>
      <button className="hideBtn" onClick={() => setVisible(false)}>
        hide
      </button>
      {props.children}
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  label: PropTypes.string.isRequired
}

export default Togglable