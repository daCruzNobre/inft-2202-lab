import express from 'express';
// create some contentRoutes

// Initialize the contentRoutes
export const contentRoutes = express.Router();

contentRoutes.get('/', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'Content-Type': "text/plain"}
    
    response.writeHead(200, headers);
    response.end('hello world');
});
contentRoutes.get('/about', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'Content-Type': "text/plain"}
    
    response.writeHead(200, headers);
    response.end('about');
});
contentRoutes.get('/contact', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'Content-Type': "text/plain"}
    
    response.writeHead(200, headers);
    response.end('Hello Wolrd');
});