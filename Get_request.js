const http = require('http')

const optionsGET = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'GET'
}

const reqGET = http.request(optionsGET, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

reqGET.on('error', error => {
  console.error(error)
})

reqGET.end()
