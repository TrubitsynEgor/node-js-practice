const http = require('http')

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })

  if (req.url === '/users') {
    return res.end(
      JSON.stringify([
        {
          id: 1,
          name: 'Egor',
          age: 33,
        },
      ])
    )
  }
  if (req.url === '/posts') {
    return res.end('POSTS')
  }
  res.end(req.url)
})

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
