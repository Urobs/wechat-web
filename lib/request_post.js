const https = require(https)

function requestPost(url, data) {
  return new Promise((resolve, reject) => {
    const urlData = JSON.parse(url)
    const options = {
      hostname: urlData.hostname,
      path: urlData.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data, 'utf8')
      }
    }
    const req = https.request(options, (res) => {
      let buffer = []
      let result = ""
      res.on('data', data => {
        buffer.push(data)
      })
      res.on('end', () => {
        result = Buffer.concat(buffer).toString()
        resolve(result)
      })
    })
    .on('error', err => {
      console.log(err)
      reject(err)
    })
    req.write(data)
    req.end()
  })
}
module.exports = requestPost