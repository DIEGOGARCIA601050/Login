// const http = require('node:http')
// const fs = require('node:fs')

// const server = http.createServer((req, res)=>{
//     const read = fs.createReadStream('../index.html')
//     read.pipe(res)
// })

// server.listen(3000)
// console.log(`Server on port ${3000}`);
let path = require('path');
const express = require('express')

const app = express()

app.get('/',(req, resp)=>{
    resp.sendFile(path.resolve('../index.html'));

})

app.listen(3000)
console.log(`Server on port ${3000}`)