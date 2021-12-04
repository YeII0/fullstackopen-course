import React from 'react'
import Togglable from './Togglable'

const Blog = ({
  blog,
  addLike,
  showRemoveButton,
}) => {
  const blogStyle = {
    borderStyle: 'solid',
    borderColor: 'lightgrey',
    borderWidth: 3,
    borderRadius: 5,
    padding: 4,
    marginBottom: 4
  }

  return (
    <div data-name="blog">
      <div style={blogStyle}>
        <div className="title">
          Title: {blog.title}&nbsp;
        </div>
        <div className="author">
          Author: {blog.author}
        </div>
        <Togglable label="show more">
          <div className="url">
            Url: {blog.url}
          </div>
          <div className="likes">
            Likes: <span data-name="likesNumber">{blog.likes}</span>&nbsp;
            <button className="likeButton" onClick={() => addLike(blog)}>like</button>
          </div>
          {showRemoveButton(blog)}
        </Togglable>
      </div>
    </div>
  )
}

export default Blog