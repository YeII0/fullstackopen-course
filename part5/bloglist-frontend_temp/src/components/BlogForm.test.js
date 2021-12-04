import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> submit handler receives correct data to create blog', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')
  const likesInput = component.container.querySelector('#likes')

  fireEvent.change(authorInput, {
    target: { value: 'William B Irvine' }
  })
  fireEvent.change(titleInput, {
    target: { value: 'Stoic Path' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://joyoflife.com' }
  })
  fireEvent.change(likesInput, {
    target: { value: 50 }
  })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].author).toBe('William B Irvine')
  expect(createBlog.mock.calls[0][0].title).toBe('Stoic Path')
  expect(createBlog.mock.calls[0][0].url).toBe('https://joyoflife.com')
  expect(createBlog.mock.calls[0][0].likes).toBe('50')
})