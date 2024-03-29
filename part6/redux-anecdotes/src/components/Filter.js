import React from 'react'
import { connect } from 'react-redux'
import { setQuery } from '../reducers/filterReducer'

const Filter = props => {
  const handleChange = (event) => {
    props.setQuery(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(
  null,
  { setQuery }
)(Filter)

export default ConnectedFilter