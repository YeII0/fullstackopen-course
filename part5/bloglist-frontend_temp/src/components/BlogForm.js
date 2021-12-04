import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const saveBlog = async event => {
    event.preventDefault()

    createBlog({
      author: author,
      title: title,
      url: url,
      likes: likes
    })
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