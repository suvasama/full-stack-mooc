const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Maailman paras blogi',
    author: 'Etunimi Sukunimi',
    url: 'https://www.maailmanparasblogi.fi',
    likes: 1,
    id: '65a54d1a3eb83c19e9df7866'
  },{
    title: 'My Awesome Blog',
    author: 'Firstname Lastname',
    url: 'https://www.myawesomeblog.com',
    likes: 4,
    id: '65a5549883bfb56e3a1596d9'
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