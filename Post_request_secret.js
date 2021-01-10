const http = require('http')

const optionsPOST = {
  hostname: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {
  'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem',
  'name': 'PIKE'
  }
}

const reqPOST = http.request(optionsPOST, res => {
  res.on('data', d => {
    process.stdout.write(d)
  })
})

reqPOST.on('error', error => {
  console.error(error)
})

reqPOST.end()