import { logger } from "../utils/logger.js";

export const LogginMiddleware = (request, response, next) => {
    logRequest(request, response);
    next();
    
}

const logRequest = async ( request, response ) => {
    // get values from the rewuest log
    const {body, params, query, path, method, headers, originalUrl} = request;
    // get some values from the response
    const time = new Date().toISOString();
    // log the original response.jsom method
    const {statusCode } = response;
    // with something that will wait for the response to be ready
    const og = response.json;

    response.json = async (value) => {
        const data  = await Promise.resolve(value);
        response.locals.data = data;
        return og.call(response, data) 
    }

    // collect the information you'd like to keep in log
    const { data } = response.locals;
    const context = {
        time,
        request: {
            body,
            params,
            query,
            headers
        },
        response: {
            ...data
        }
    };

    if(response.headerSent){
        logger.info(`RESPONSE: ${method} ${path} ${originalUrl}`, context);
    } else{
        logger.info(`REQUEST: ${method} ${originalUrl}`, context);
    }
    
}