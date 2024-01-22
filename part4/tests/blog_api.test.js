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

describe('when there are initially some blogs saved', () => {
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
})

describe ('adding a new blog', () => {
  test('succeeds with valid data', async () => {
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

  test('succeeds with 0 likes if likes are missing', async () => {
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

  test('fails if title is missing', async () => {
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

  test('fails ift url is missing', async () => {
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

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('updating a blog', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 1
    const updatedBlog = {
      ...blogToUpdate,
      likes: updatedLikes
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogAtEnd = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlogAtEnd.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
