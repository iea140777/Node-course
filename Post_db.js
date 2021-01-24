const http = require('http')

const optionsPOST = {
  hostname: 'localhost',
  port: 8080,
  path: '/private',
  method: 'POST',
  headers: {
  'password': 'HobbitBilbo!',
  'name': 'User'
  }
}

const reqPOST = http.request(optionsPOST, res => {
  res.on('data', d => {
    console.log(JSON.parse(d));
  })
})

reqPOST.on('error', error => {
  console.error(error)
})

reqPOST.end()