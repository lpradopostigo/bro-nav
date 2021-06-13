
const envMode = process.env.NODE_ENV

if (envMode === 'development') {
  module.exports = {
    mount: {
      src: '/dist',
      example: '/'
    }
  }
} else if (envMode === 'production') {
  module.exports = {
    mount: {
      src: '/dist'
    }
  }
}
