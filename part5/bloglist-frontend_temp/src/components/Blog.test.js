import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let addLike
  let showRemoveButton

  beforeEach(() => {
    const blog = {
      author: 'Maciej Rozyc',
      title: 'Being Vegan',
      url: 'https://beingvegan.pl',
      likes: 50
    }

    addLike = jest.fn()
    showRemoveButton = jest.fn()

    component = render(
      <Blog blog={blog} addLike={addLike} showRemoveButton={showRemoveButton} />
    )
  })

  test('show only author and title info as default', () => {
    const title = component.queryByText('Title', { exact: false })
    expect(title).toBeDefined()

    const author = component.queryByText('Author', { exact: false })
    expect(author).toBeDefined()

    const url = component.queryByText('Url', { exact: false })
    expect(url).toBeNull()

    const likes = component.queryByText('Likes', { exact: false })
    expect(likes).toBeNull()
  })

  test('shows url and likes info after clicking "show more" button', () => {
    const showMoreButton = component.container.querySelector('.showButton')
    fireEvent.click(showMoreButton)

    const url = component.queryByText('Url', { exact: false })
    expect(url).toBeDefined()

    const likes = component.queryByText('Likes', { exact: false })
    expect(likes).toBeDefined()
  })

  test('like button clicked twice call event handler twice', () => {
    const showMoreButton = component.container.querySelector('.showButton')
    fireEvent.click(showMoreButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})