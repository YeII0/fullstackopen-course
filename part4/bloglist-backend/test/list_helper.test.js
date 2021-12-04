const listHelper = require('../utils/list_helper')
const mockData = require('./mock_data')

test('dummy returns one', () => {
  const blogs = []

  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(mockData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(mockData.blogs)
    expect(result).toBe(36)
  })
})

describe('favouriteBlog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(null)
  })

  test('of one blog is blog itself', () => {
    const result = listHelper.favouriteBlog(mockData.listWithOneBlog)
    expect(result).toEqual(mockData.listWithOneBlog[0])
  })

  test('of bigger list right blog is choosed', () => {
    const result = listHelper.favouriteBlog(mockData.blogs)
    expect(result).toEqual(mockData.blogs[2])
  })
})

describe('makeAuthorsList', () => {
  test(
    'of return value is empty array when empty list is provided'
    , () => {
      const result = listHelper.makeAuthorsList([])
      expect(result).toEqual([])
    })

  test('of making list of authors when more than one blog is provided', () => {
    const result = listHelper.makeAuthorsList(mockData.blogs)
    expect(result).toEqual(["Michael Chan", "Edsger W. Dijkstra", "Robert C. Martin"])
  })
})

describe('mostBlogs', () => {
  test('of empty array of blogs is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('of returning blog when only one is provided', () => {
    const result = listHelper.mostBlogs(mockData.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test(
    'of finding author with most blogs when more than one blog is provided'
    , () => {
      const result = listHelper.mostBlogs(mockData.blogs)
      expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 })
    })
})

describe('mostLikes', () => {
  test('of empty array of blogs is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('of returning blog when only one is provided', () => {
    const result = listHelper.mostLikes(mockData.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test(
    'of finding author with most likes when more than one blog is provided'
    , () => {
      const result = listHelper.mostLikes(mockData.blogs)
      expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })

  describe('countAuthorsLikes', () => {
    test(
      'of count total likes of authors when more than one blog is provided'
      , () => {
        const result = listHelper.countAuthorsLikes(mockData.blogs)
        expect(result).toEqual(
          [
            { "author": "Michael Chan", "likes": 7 },
            { "author": "Edsger W. Dijkstra", "likes": 17 },
            { "author": "Robert C. Martin", "likes": 12 }
          ]
        )
      }
    )
  })
})