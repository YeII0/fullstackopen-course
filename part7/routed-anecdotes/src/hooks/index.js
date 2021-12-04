import { useState } from 'react'

export const useField = ({ type, name }) => {
  const [value, setValue] = useState('')

  const onChange = event => setValue(event.target.value)

  const reset = () => setValue('')

  return {
    attributes: {
      value,
      type,
      name,
      onChange,
    },
    reset,
    value
  }
}