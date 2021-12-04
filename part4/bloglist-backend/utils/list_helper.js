const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogs) => {
    return sum + blogs.likes
  }, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorBlogs = countAuthorsBlogs(blogs)
  const mostBlogsAuthor = authorBlogs.reduce((mostBlogsAuthor, author) => {
    return mostBlogsAuthor.blogs < author.blogs
      ? mostBlogsAuthor = author
      : mostBlogsAuthor
  })
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorsLikes = countAuthorsLikes(blogs)
  const maxLikes = Math.max(...authorsLikes.map(author => author.likes))
  return authorsLikes.find(author => author.likes === maxLikes)
}

const countAuthorsBlogs = (blogs) => {
  return makeAuthorsList(blogs).map((author) => {
    const blogsNumber = blogs.reduce((sum, blog) => {
      return blog.author === author
        ? sum + 1
        : sum
    }, 0)
    return {
      author: author,
      blogs: blogsNumber
    }
  })
}

const countAuthorsLikes = (blogs) => {
  return makeAuthorsList(blogs).map(author => {
    const likes = blogs.reduce((sum, blog) => {
      return author === blog.author
        ? sum + blog.likes
        : sum
    }, 0)
    return {
      author: author,
      likes: likes
    }
  })
}

const makeAuthorsList = (blogs) => {
  const returnValue = blogs.reduce((authors, blog) => {
    return authors.includes(blog.author)
      ? authors
      : authors.concat(blog.author)
  }, [])
  return returnValue
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  makeAuthorsList,
  countAuthorsBlogs,
  countAuthorsLikes
}