const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helpers')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(r => r.id)).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    'title': 'Min vackra värld',
    'author': 'Förnamn Efternamn',
    'url': 'https://www.minvackravarld.se',
    'likes': 2
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const urls = blogsAtEnd.map(r => r.url)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(urls).toContain(
    'https://www.minvackravarld.se'
  )
})

test('blog without likes is added with 0 likes', async () => {
  const blogMissingLikes = {
    'title': 'Min vackra värld',
    'author': 'Förnamn Efternamn',
    'url': 'https://www.minvackravarld.se'
  }
  await api
    .post('/api/blogs')
    .send(blogMissingLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blogZeroLikes = blogsAtEnd.find(r => r.url === blogMissingLikes.url)
  expect(blogZeroLikes.likes).toBe(0)
})

describe('blog with a missing field is not added', () => {
  test('blog without title is not added', async () => {
    const blogMissingTitle = {
      'author': 'Förnamn Efternamn',
      'url': 'https://www.minvackravarld.se',
      'likes': 2
    }

    await api.
      post('/api/blogs')
      .send(blogMissingTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const blogMissingUrl = {
      'author': 'Förnamn Efternamn',
      'title': 'Min vackra värld',
      'likes': 2
    }

    await api.
      post('/api/blogs')
      .send(blogMissingUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
