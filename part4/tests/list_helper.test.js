const listHelper = require('../utils/list_helper')

const emptyBlogList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },{
    _id: '65a54d1a3eb83c19e9df7866',
    title: '8 Blog Topic Generators for Blog Post Idea Inspiration',
    author: 'Megan Marrs',
    url: 'https://www.wordstream.com/blog/ws/2015/02/12/blog-topic-generators',
    likes: 38,
    __v: 0
  },{
    _id: '65a54d1a3eb83c19e9df7866',
    title: 'Blogin kirjoittaminen: Askel askeleelta kohti menestyvää blogia',
    author: 'Mikaela Laukkanen',
    url: 'https://www.wordstream.com/blog/ws/2015/02/12/blog-topic-https://bukra.fi/blogin-kirjoittaminen/',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(45)
  })
})

describe('favorite blog', () => {
  test('of empty list is empty', () => {
    const result = listHelper.favoriteBlog(emptyBlogList)
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals the information of that', () => {
    const oneBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(oneBlog)
  })

  test('of a bigger list is retrived correctly', () => {
    const favorite = {
      title: '8 Blog Topic Generators for Blog Post Idea Inspiration',
      author: 'Megan Marrs',
      likes: 38
    }
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(favorite)
  })
})