const http = require('http')

const routesHandler = require('./routesHandler')

const server = http.createServer(routesHandler)

server.listen(3000)


 