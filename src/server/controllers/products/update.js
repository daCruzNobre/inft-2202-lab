import { checkSchema } from "express-validator";

import Product from "../../models/Product.js"

const rules = checkSchema({

    name: {
        isString: true,
        errorMessage: '"Name" must be a alphabetical'
    },
    description: {
        isString: true,
        errorMessage: '"Description" must be a alphabetical'
    },
    stock: {
        isNumeric: true,
        errorMessage: '"stock" must be a number'
    },
    price: {
        isNumeric: true,
        errorMessage: '"price" must be a number'
    },
}, ['body'])

const handle = async (request, response, next) => {
    // response.end('create product');

    try{
        const updateProduct = request.body;      
        const product = await Product.findOneAndUpdate(
            {_id: request.params.productId}, updateProduct, {new: true}
        );
        // product.replaceOne()
        response.json(product);
        // console.log(product);
        // console.log(updatedAnimal);
    } catch (error){
        next(error);
    }
}

export default { handle, rules };