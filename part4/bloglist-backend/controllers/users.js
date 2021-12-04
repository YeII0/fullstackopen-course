const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate(
    'blogs', { author: 1, title: 1, url: 1, likes: 1 }
  )
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password) {
    return response.status(400).json({
      error: 'Password required'
    })
  }
  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'User validation failed: password: Path `password` (`ye`) is'
        + ' shorter than the minimum allowed length (3).'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  response.json(await user.save())
})

module.exports = usersRouter