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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const blogCounts = blogs.reduce((acc, curr) => {
    if (!Object.hasOwnProperty.call(acc, curr.author)) {
      acc[curr.author] = 0
    }
    acc[curr.author]++
    return acc
  }, {})
  const blogCountsExtended = Object.keys(blogCounts).map(k => {
    return { author : k, blogs : blogCounts[k] }
  })
  const maxBlogs = blogCountsExtended.reduce((acc, curr) => {
    return acc = acc > curr.blogs ? acc : curr.blogs
  }, 0)
  return blogCountsExtended.find((blog) => blog.blogs===maxBlogs)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const likesCounts = blogs.reduce((acc, curr) => {
    if (!Object.hasOwnProperty.call(acc, curr.author)) {
      acc[curr.author] = 0
    }
    acc[curr.author] += curr.likes
    return acc
  }, {})
  const likesCountsExtended = Object.keys(likesCounts).map(k => {
    return { author : k, likes : likesCounts[k] }
  })
  const maxLikes = likesCountsExtended.reduce((acc, curr) => {
    return acc = acc > curr.likes ? acc : curr.likes
  }, 0)
  return likesCountsExtended.find((blog) => blog.likes===maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}