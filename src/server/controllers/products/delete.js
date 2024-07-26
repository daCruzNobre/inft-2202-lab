import Product from "../../models/Product.js"
import { NotFoundError } from "../../errors/NotFoundError.js";

const handle = async (request, response, next) => {
    // response.end('create product');
     console.log(request.params.productId)
    try{             
        const product = await Product.findOneAndDelete(
            {_id: request.params.productId}
        );
        if (!product){
            throw new NotFoundError('Could not find that product');
        }     
        response.json({ message: 'Product deleted successfully', product });       
    } catch (error){
        next(error);
    }
}

export default { handle };