const fs = require('fs')

const routesHander = (request, response) => {
    const url = request.url
    const method = request.method
    
    if (url === '/') {
        
        response.setHeader('Content-type', 'text/html')
    
        response.write('<html>')
    
            response.write('<head>')
                response.write('<title>My first server!</title>')
            response.write('</head>')
    
            response.write('<body>')
                response.write('<h1>Write a message!</h1>')
                response.write('<form action="/message" method="POST">')
                    response.write('<input type="text" name="message" />')
                    response.write('<button>Send!</button>')
                response.write('</form>')
        
            response.write('</body>')
        
        response.write('</html>')
    
        return response.end()
        
    }
    
    if (url === '/message' && method === 'POST') {
        const body = []
    
        request.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
    
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            
            const message = parsedBody.split('=')[1]
            console.log(message)
            
            fs.writeFile('message.txt', message, (err) => {
                response.statusCode = 302
                response.setHeader('Location', '/')
                return response.end()
            })
            
        })
    
    }
    
    response.setHeader('Content-type', 'text/html')
    
    response.write('<html>')
    
        response.write('<head>')
            response.write('<title>My first server!</title>')
        response.write('</head>')
    
        response.write('<body>')
            response.write('<h1>No specific URL</h1>')
    
        response.write('</body>')
    
    response.write('</html>')
    
    response.end()

}

module.exports = routesHander

