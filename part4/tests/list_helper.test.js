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
    _id: '35b29461430b9b415246b9f5',
    title: 'All Sorts of Harmfull Stuff',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Harmful_Stuff.html',
    likes: 40,
    __v: 0
  },{
    _id: '65a54d1a3eb83c19e9df7866',
    title: 'Blogin kirjoittaminen: Askel askeleelta kohti menestyvää blogia',
    author: 'Mikaela Laukkanen',
    url: 'https://bukra.fi/blogin-kirjoittaminen/',
    likes: 2,
    __v: 0
  },{
    _id: '65a54cdf3eb83c19e9df7863',
    title: 'Blogin kirjoittaminen: Raflaavan otsikon keksiminen',
    author: 'Mikaela Laukkanen',
    url: 'https://bukra.fi/blogin-kirjoittaminen-otsikon-keksiminen/',
    likes: 8,
    __v: 0
  },{
    _id: '65a5549883bfb56e3a1596d9',
    title: 'Blogin kirjoittaminen: Miten saan tykkäyksiä?',
    author: 'Mikaela Laukkanen',
    url: 'https://bukra.fi/blogin-kirjoittaminen-tykkaykset/',
    likes: 0,
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
    expect(result).toBe(55)
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
      title: 'All Sorts of Harmfull Stuff',
      author: 'Edsger W. Dijkstra',
      likes: 40,
    }
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(favorite)
  })
})

describe('author with the most blogs', () => {
  test('of empty list is empty', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals the information of that', () => {
    const oneBlog = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(oneBlog)
  })

  test('of a bigger list is retrived correctly', () => {
    const highestBlogCount = {
      author: 'Mikaela Laukkanen',
      blogs: 3,
    }
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual(highestBlogCount)
  })
})

describe('author with the most likes', () => {
  test('of empty list is empty', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals the information of that', () => {
    const oneBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(oneBlog)
  })

  test('of a bigger list is retrived correctly', () => {
    const highestLikesSum = {
      author: 'Edsger W. Dijkstra',
      likes: 45,
    }
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual(highestLikesSum)
  })
})