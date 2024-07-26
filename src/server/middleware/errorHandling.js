import { ConflictError } from "../errors/ConflictError.js";
import { logger } from "../utils/logger.js";

export const ErrorHandlingMiddleware = (error, request, response, next) => {
    const { message, stack, statusCode = 500 } = error;
    const {method, originalUrl, headers, query, body, params } = request;
    const time = new Date().toISOString();
    const context = {
        time,
        stack,
        request: {
            method, path: originalUrl, headers, query, body, params
        },
        response: {
            body: response.locals.data, statusCode: error.status ?? 500
        }
    };

    const responseObject = { message }
    if (error instanceof ConflictError) {
        responseObject.errors = error.details?.errors;
    }

    logger.error(`${statusCode}: ${message}`, context);
    // ?? -> nullish operator
    response.status(statusCode).send(responseObject)
} 