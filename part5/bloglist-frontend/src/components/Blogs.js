import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { addLike } from '../reducers/blogReducer'
import { initBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const Blogs = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const blogs = useSelector(state => {
    return state.blogs.sort((first, second) => (second.likes - first.likes))
  })

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])


  const removeBlogHandler = async blog => {
    if (!window.confirm('Are you sure dude?')) {
      return
    }
    dispatch(removeBlog(blog))
  }

  const showRemoveButton = blog => {
    return !user || blog.user.username !== user.username
      ? null
      : <button onClick={() => removeBlogHandler(blog)}>remove</button>
  }

  return (
    <div data-name="blogs">
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          showRemoveButton={showRemoveButton}
          addLike={() => dispatch(addLike(blog))}
        />
      )}
    </div>
  )
}

export default Blogs
