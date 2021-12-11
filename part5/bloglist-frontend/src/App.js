import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'
import { initUsers } from './reducers/userReducer'
import { setUser } from './reducers/loggedUserReducer'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogFormTogglableRef = useRef()

  const match = useRouteMatch('/users/:id')
  const choosedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  useEffect(() => dispatch(initUsers()), [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <Login />
      {currentUser &&
        <Togglable label="create new blog" ref={blogFormTogglableRef}>
          <BlogForm togglableRef={blogFormTogglableRef} />
        </Togglable>
      }
      <Blogs />
      <Switch>
        <Route path="/users/:id">
          <User user={choosedUser} />
        </Route>
        <Route path="/">
          <Users users={users} />
        </Route>
      </Switch>
    </div>
  )
}

export default App