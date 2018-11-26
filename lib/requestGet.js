const https = require('https')

function requestGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let buffer = []
      let result = ""
      res.on('data', function (data) {
        buffer.push(data)
      })
      res.on('end', () => {
        result = Buffer.concat(buffer).toString()
        resolve(result)
      })
    }).on('error', err => {
      reject(err)
    })
  })
}

module.exports = requestGet