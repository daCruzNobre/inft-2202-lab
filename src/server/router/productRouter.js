import express from 'express';
import ProductCreateController  from '../controllers/products/create.js'
import ProductRetrieveController  from '../controllers/products/retrieve.js'
import ProductUpdateController  from '../controllers/products/update.js'
import ProductDeleteController from '../controllers/products/delete.js';
import ProductSearchController from '../controllers/products/search.js';
import { CheckValidation } from '../middleware/validation.js';

// create some Router

// Initialize the Router
export const productRouter = express.Router();
// route for post
// productRouter.post('/products', (request, response, next)=>{
//     const {url, method} = request;
//     const headers = {'Content-Type': "text/plain"}
    
//     response.writeHead(200, headers);
//     response.end('insert product');
// });
productRouter.get(
    '/products',
    CheckValidation(ProductSearchController.rules),
    ProductSearchController.handle
);

// create    
productRouter.post('/products', CheckValidation(ProductCreateController.rules), ProductCreateController.handle)

// route for get list
productRouter.get('/products/:productId', ProductRetrieveController.handle)

// route for update Product
productRouter.put('/products/:productId', CheckValidation(ProductUpdateController.rules), ProductUpdateController.handle)

// Route for deleting product
productRouter.delete('/products/:productId', ProductDeleteController.handle)

// route for get



// productRouter.get('/products/:productId', (request, response, next)=>{
//     const {url, method} = request;
//     const headers = {'Content-Type': "text/plain"}
    
//     // const {productId, value} = request.params
//     response.writeHead(200, headers);    
//     response.end(`Product id is: ${request.params.productId}`);
// });

// route for get put
// productRouter.put('/products/:productId', (request, response, next)=>{
//     const {url, method} = request;
//     const headers = {'Content-Type': "text/plain"}
    
//     // const {productId, value} = request.params
//     response.writeHead(200, headers);    
//     response.end(`Product id is: ${request.params.productId}`);
// });
// route for get delete
// productRouter.delete('/products/:productId', (request, response, next)=>{
//     const {url, method} = request;
//     const headers = {'Content-Type': "text/plain"}
    
//     // const {productId, value} = request.params
//     response.writeHead(200, headers);    
//     response.end(`Product to delete is: ${request.params.productId}`);
// });