import { validationResult } from "express-validator";
import { ConflictError } from "../errors/ConflictError.js";

function doValidation (request, response, next){
    const result = validationResult(request);
    if (result.isEmpty()) {
         return next();
    }

    const errorObj = { errors: result.array() };
    console.log(errorObj)
    // response.status(409).json({ errors: result.array() });
    next(new ConflictError('Input Validation Failed', errorObj));
}

export function CheckValidation (rules) {
    return [rules, doValidation]
}