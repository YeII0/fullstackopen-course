import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loggedUserReducer'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormTogglableRef = useRef()

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
      {user &&
        <Togglable label="create new blog" ref={blogFormTogglableRef}>
          <BlogForm togglableRef={blogFormTogglableRef} />
        </Togglable>
      }
      <Blogs />
      <h2>Users</h2>
      <Users />
    </div>
  )
}

export default App