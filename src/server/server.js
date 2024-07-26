// import the http library
// note - there is also a https library
import http from 'node:http';

// constant to define port
// convention is using 3000 when developing in node.js
const PORT = 3000;

// create a basic request handler
const mainRequestHandler = (request, response, next) => {
    const {url, method} = request;
    console.log(method, url);

    const header = {'Content-Type': 'text/plain'};

    if(url === '/' && method === 'GET'){
        response.writeHead(200, header);
        response.end('Hello World!!');
    } else if(url === '/about' && method === 'GET') {
        response.writeHead(200, header);
        response.end('about'); 
    } else if(url === '/contact' && method === 'GET') {
        response.writeHead(200, header);
        response.end('call me'); 
    } else{
        response.writeHead(404, header);
        response.end('Womp womp (not found)');
    }
}

// create a new instance of the server
const server = http.createServer(mainRequestHandler);

// start it
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});