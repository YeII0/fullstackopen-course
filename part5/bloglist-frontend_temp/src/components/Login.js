import React, { useState } from 'react'
import helper from '../utils/helper'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setMessage, setMessageType }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      helper.showNotification(
        setMessage,
        setMessageType,
        'Wrong credentials',
        'error',
        5000
      )
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username&nbsp;
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password&nbsp;
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)
          }
        />
      </div>
      <button id="login-button" type="submit">Login</button>
    </form >
  )
}

export default Login