const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res)=>{
    const read = fs.createReadStream('../index.html')
    read.pipe(res)
})

server.listen(3000)
console.log(`Server on port ${3000}`);
// const express = require('express')

// const app = express()

// app.get('/',(req, resp)=>{
//     resp.sendFile('../index.html', {
//         root:__dirname
//     })
// })

// app.listen(3000)
// console.log(`Server on port ${3000}`)