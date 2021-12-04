const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const mockData = require('./mock_data')

const api = supertest(app)

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog(mockData.validBlog)
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getToken = async (username, password) => {
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: username,
      password: password
    })

  return token = loginResponse.body.token
}

module.exports = {
  blogsInDb,
  nonExistingId,
  usersInDb,
  getToken
}