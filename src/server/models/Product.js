import { model, Schema} from 'mongoose'

const fields = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
};

// create a mongoose schema
const schema = new Schema(fields);

// use it to create and export a new model named "Animal"
export default model('Product', schema)