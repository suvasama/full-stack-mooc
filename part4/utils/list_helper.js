// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length===0) {
    return {}
  }
  const maxValue = blogs.reduce((acc, curr) => acc = acc > curr.likes ? acc : curr.likes, 0)
  const favorite = blogs.find((blog) => blog.likes === maxValue)
  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}