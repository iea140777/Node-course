const http = require('http')

const optionsPOST = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'POST'
}

const reqPOST = http.request(optionsPOST, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

reqPOST.on('error', error => {
  console.error(error)
})

reqPOST.end()