// express uses http internally, so we'll use express instead
import express from 'express';
import { router } from './router/router.js';
// import { productRouter } from './router/productRouter.js';
import mongoose from 'mongoose';

// Import logger
import { LogginMiddleware } from './middleware/login.js' 
// import { logger } from './utils/logger.js';

// Import error Middleware
import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';

// still need a port number to operate on
const PORT = 3000;

// still need to crate a server instance
// but we'll use exepress to do it
const server = express();

// ----------- Middleware ------------//
// tell express to expect json inputs
server.use(express.json());

// tell express to use out logger
server.use(LogginMiddleware);

// automatically serve astatic assests
server.use(express.static(`${import.meta.dirname}/../client`));
server.use('/node_modules', express.static(import.meta.dirname + '/../../node_modules'));

server.use(router);
// server.use(productRouter);

server.use(ErrorHandlingMiddleware);


// connect to the database
try {
 await mongoose.connect("mongodb://localhost:27017/inft2202")
 console.log("Connected to database!");
    
// start the server
server.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});

} catch (error) {
    console.log(error);
    process.exit(1);
}
