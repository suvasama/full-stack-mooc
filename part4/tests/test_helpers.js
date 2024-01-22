const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Maailman paras blogi',
    author: 'Etunimi Sukunimi',
    url: 'https://www.maailmanparasblogi.fi',
    likes: 1
  },{
    title: 'My Awesome Blog',
    author: 'Firstname Lastname',
    url: 'https://www.myawesomeblog.com',
    likes: 4
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}