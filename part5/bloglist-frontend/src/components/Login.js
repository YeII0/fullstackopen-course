import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/loggedUserReducer'
import LoginForm from './LoginForm'

const Login = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.loggedUser)

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
  }

  return (
    <div>
      {user
        ? <p>
          {user.name} logged-in
          <button onClick={logout}>logout</button>
        </p>
        : <LoginForm />
      }
    </div>
  )
}

export default Login