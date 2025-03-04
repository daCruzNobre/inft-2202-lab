// Import methods from product.service.js and add.js
import { findProduct, updateProduct } from "./product.service.mock.js";
// import { findProduct, updateProduct } from "./product.service.js";

// import { saveProduct } from "./product.service.mock.js";
import { ProductService as ProductServiceConstructor } from "./product.service.js";
// import { saveProduct } from "./product.service.js";
import { Product } from "./model/product.js";

const host = "http://localhost:3000/api/products/"


const productService = new ProductServiceConstructor(host);

import { validateProductForm } from "./add.js";

// Look in the URL to see if there is a name parameter
const param = new URL(document.location).searchParams;
const _id = param.get("id");
const title = document.querySelector("title");
const heading = document.querySelector(".heading");
const productForm = document.querySelector(".addProductForm");
const submitBtn = document.querySelector(".submitBtn");
const spinner = document.querySelector('.fa-spinner');

// If there is a id parameter, call setupEditForm()
if (_id) {
    console.log("we are editing");
    setupEditForm();
}

async function setupEditForm() {
    heading.textContent = "Edit Product";
    title.textContent = "Edit";
    // let product = findProduct(name);
    console.log(_id)
    let product = await productService.findProduct(_id);
    let id = product._id;
    console.log(product);
    productForm.NameInput.value = product.name;
    productForm.costInput.value = product.price;
    productForm.stockInput.value = product.stock;
    productForm.descriptionInput.value = product.description;
    submitBtn.textContent = "Update Product";

    // Set name to disabled
    productForm.NameInput.disabled = true;

    productForm.addEventListener("submit", async e => await submitEditForm(_id, e));
}

async function submitEditForm(_id, e) {
    e.preventDefault();
    if (validateProductForm(productForm)) {
        // const product = {
        //     name: productForm.NameInput.value,
        //     price: parseFloat(productForm.costInput.value).toFixed(2),
        //     stock: parseInt(productForm.stockInput.value, 10),
        //     description: productForm.descriptionInput.value,
        // };

        let description = productForm.descriptionInput.value;
        const product = new Product(productForm.NameInput.value, Number(productForm.costInput.value), Number(productForm.stockInput.value), description);
        // console.log(product);
        try{
            // console.log(_id);
            spinner.classList.remove("d-none");
            await productService.updateProduct(_id, product);
            spinner.classList.add("d-none");
            window.location.href = "list.html";
        } catch(error){
            spinner.classList.add("d-none");
            console.log(error);
        }
        // if (updateProduct(product)) {
        // }
    }
}
