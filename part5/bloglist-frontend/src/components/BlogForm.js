import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ togglableRef }) => {
  const dispatch = useDispatch()


  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const saveBlog = async event => {
    event.preventDefault()

    const blog = {
      author: author,
      title: title,
      url: url,
      likes: likes
    }

    dispatch(createBlog(blog))
      .then(() => togglableRef.current.toggleVisibility())
  }

  return (
    <form onSubmit={saveBlog}>
      <div>
        <div>author</div>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <div>title</div>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <div>url</div>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <div>likes</div>
        <input
          id="likes"
          type="text"
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form >
  )
}

export default BlogForm