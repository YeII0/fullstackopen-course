const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./api_test_helper')
const mockData = require('./mock_data')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(mockData.blogs)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('foo', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

})

describe('when there are initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = await helper.blogsInDb()
    expect(response.body).toHaveLength(blogsAtStart.length)
  })

  test('a blog have property "id"', async () => {
    const blog = await helper.blogsInDb()
    expect(blog[0].id).toBeDefined()
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToView = blogs[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(blogToView)
  })

  test('fails with 404 status if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with 400 status and error msg if invalid id is given', async () => {
    const invalidId = 34
    await api
      .get(`/api/blogs/${invalidId}`)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const users = await helper.usersInDb()
    const userToLogin = users[0]

    const token = await helper.getToken(userToLogin.username, 'foo')

    const newBlog = {
      title: 'Being vegan',
      author: 'Maciej Rozyc',
      url: 'https://beingvegan.com',
      likes: 5,
    }

    const blogsAtStart = await helper.blogsInDb()

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const idsAtEnd = blogsAtEnd.map(blog => blog.id.toString())
    expect(idsAtEnd).toContain(response.body.id)
  })

  test('missing "likes" property is set to 0', async () => {
    const users = await helper.usersInDb()
    const userToLogin = users[0]

    const blogNoLikesProp = {
      title: 'Being vegan',
      author: 'Maciej Rozyc',
      url: 'https://beingvegan.com',
    }

    const token = await helper.getToken(userToLogin.username, 'foo')

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogNoLikesProp)

    expect(response.body.likes).toEqual(0)
  })

  test('fails with 400 and json msg when posted blog missing "user", "url", "title" properties', async () => {
    const users = await helper.usersInDb()
    const userToLogin = users[0]

    const token = await helper.getToken(userToLogin.username, 'foo')

    const test = async (blog) => {
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }

    const blogNoTitle = {
      author: 'Maciej Rozyc',
      url: 'https://beingvegan.com',
      likes: 5,
    }

    await test(blogNoTitle)

    const blogNoUrl = {
      title: 'Being vegan',
      author: 'Maciej Rozyc',
      likes: 5,
    }

    await test(blogNoUrl)
  })

  test('fails when token is not provided or is invalid with proper status code', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer invalidtoken')
      .send(mockData.validBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(mockData.validBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe('update of a blog', () => {
  test('succeeds with status code 200 and json response', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const update = {
      likes: blogToUpdate.likes + 1
    }
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = response.body

    expect(returnedBlog.likes).toEqual(update.likes)
  })

  test('fails with status code 400 when update data is invalid', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const update = {
      likes: 'invalid value'
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    expect(usersAtEnd).toContainEqual(result.body)
  })

  test(
    'creation fails with proper statuscode and message when username already exists'
    , async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'qwerty'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

  test(
    'creation fails with proper statuscode when invalid user'
    , async () => {
      const testInvalidUser = async (newUser, errorMsgPart) => {
        const usersAtStart = await helper.usersInDb()

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain(errorMsgPart)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      }

      const noPassword = {
        username: 'macieksej'
      }
      await testInvalidUser(noPassword, 'Password required')

      const tooShortPassword = {
        username: 'macieksej',
        password: 'la'
      }
      await testInvalidUser(tooShortPassword, 'length')

      const noUsername = {
        password: 'qwerty'
      }
      await testInvalidUser(noUsername, 'username')

      const tooShortUsername = {
        username: 'ma',
        password: 'qwerty'
      }
      await testInvalidUser(tooShortUsername, 'length')
    })
})

afterAll(() => {
  mongoose.connection.close()
})