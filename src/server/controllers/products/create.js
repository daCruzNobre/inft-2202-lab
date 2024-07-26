import { checkSchema } from "express-validator";

import Product from "../../models/Product.js"
import { ConflictError } from "../../errors/ConflictError.js";

const rules = checkSchema({

    name: {
        isString: true,
        errorMessage: '"Name" must be a alphabetical'
    },
    description: {
        isString: true,
        errorMessage: '"Breed" must be a alphabetical'
    },
    stock: {
        isNumeric: true,
        errorMessage: '"eyes" must be a number'
    },
    price: {
        isNumeric: true,
        errorMessage: '"eyes" must be a number'
    },
}, ['body']);

const handle = async (request, response, next) => {
    // response.end('create product');

    try{
        const { name, description, stock, price,} = request.body;
        const exists = await Product.findOne({ name });
        if (exists) {
            throw new ConflictError('That product already exists');
        }
        const product = await Product.create({
            name,
            description,
            stock,
            price,
        });
        response.json(product);
    } catch (error){
        next(error);
    }
}

export default { handle, rules };
