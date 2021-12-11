import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import helper from './utils/helper'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  // const message = useSelector(state => state)

  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((first, second) => (second.likes - first.likes))
      setBlogs(sortedBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  dispatch(setNotification({
    message: 'foo',
    messageType: 'success'
  }))

  const addBlog = async blog => {
    try {
      const savedBlog = await blogService.create(blog)

      helper.showNotification(
        setMessage,
        setMessageType,
        `a new blog ${blog.title} added`,
        'success',
        5000
      )
      const updatedBlogs = blogs.concat(savedBlog)

      const sortedBlogs = updatedBlogs.sort(
        (first, second) => (second.likes - first.likes)
      )
      setBlogs(sortedBlogs)
      blogFormRef.current.setVisible(false)
    } catch (error) {
      helper.showNotification(
        setMessage,
        setMessageType,
        error,
        'error',
        5000
      )
    }
  }

  const removeBlog = async blogToRemove => {
    if (!window.confirm('Are you sure dude?')) {
      return
    }
    await blogService.remove(blogToRemove.id)
    setBlogs(
      blogs.filter(blog => blog.id !== blogToRemove.id)
    )
  }

  const showRemoveButton = blog => {
    return !user || blog.user.username !== user.username
      ? null
      : <button onClick={() => removeBlog(blog)}>remove</button>
  }

  const addLike = async blogToUpdate => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    try {
      const savedBlog = await blogService.update(updatedBlog.id, updatedBlog)

      const updatedBlogs = blogs.map(
        blog => blog.id !== updatedBlog.id ? blog : savedBlog
      )

      const sortedBlogs = updatedBlogs.sort(
        (first, second) => (second.likes - first.likes)
      )
      setBlogs(sortedBlogs)
    } catch (error) {
      helper.showNotification(
        setMessage,
        setMessageType,
        error,
        'error',
        5000
      )
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      <h2>blogs</h2>
      {user
        ? <div>
          <p>
            {user.name} logged-in
            <button onClick={logout}>logout</button>
          </p>
          <Togglable label="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
        : <Login
          setUser={setUser}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      }
      <div data-name="blogs">
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            showRemoveButton={showRemoveButton}
          />
        )}
      </div>
    </div>
  )
}

export default App