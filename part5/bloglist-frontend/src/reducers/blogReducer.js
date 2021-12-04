import blogService from './../services/blogs'
import { createNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'ADD_LIKE':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = blog => {
  return dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    return blogService.update(updatedBlog.id, updatedBlog)
      .then(updatedBlog => {
        dispatch({
          type: 'ADD_LIKE',
          data: updatedBlog
        })
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(createNotification({
          message: error,
          messageType: 'error',
          displayTime: 5000
        }))
        return Promise.reject()
      })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
    dispatch(createNotification({
      message: 'Blog has been removed',
      messageType: 'success',
      displayTime: 5000
    })
    )
  }
}

export const createBlog = blog => {
  return dispatch => {
    return blogService.create(blog)
      .then(newBlog => {
        dispatch({
          type: 'NEW_BLOG',
          data: newBlog
        })
        dispatch(createNotification({
          message: `a new blog ${blog.title} added`,
          messageType: 'success',
          displayTime: 5000
        }))
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(createNotification({
          message: error,
          messageType: 'error',
          displayTime: 5000
        }))
        return Promise.reject()
      })
  }
}

export default reducer