// Import methods from product.service.js and add.js
import { findProduct, updateProduct } from "./product.service.mock.js";
// import { findProduct, updateProduct } from "./product.service.js";

// import { saveProduct } from "./product.service.mock.js";
import { ProductService as ProductServiceConstructor } from "./product.service.js";
// import { saveProduct } from "./product.service.js";
import { Product } from "./product.js";
import { key } from "../../apikey.js";

const host = "https://inft2202.paclan.net/api/products/"

const productService = new ProductServiceConstructor(host, key);

import { validateProductForm } from "./add.js";

// Look in the URL to see if there is a name parameter
const param = new URL(document.location).searchParams;
const productId = param.get("id");
const title = document.querySelector("title");
const heading = document.querySelector(".heading");
const productForm = document.querySelector(".addProductForm");
const submitBtn = document.querySelector(".submitBtn");

// If there is a name parameter, call setupEditForm()
if (productId) {
    setupEditForm();
}

async function setupEditForm() {
    heading.textContent = "Edit Product";
    title.textContent = "Edit";
    // let product = findProduct(name);
    let product = await productService.findProduct(productId);
    console.log(product);
    productForm.NameInput.value = product.name;
    productForm.costInput.value = product.price;
    productForm.stockInput.value = product.stock;
    productForm.descriptionInput.value = product.description;
    submitBtn.textContent = "Update Product";

    // Set name to disabled
    productForm.NameInput.disabled = true;

    productForm.addEventListener("submit", submitEditForm);
}

function submitEditForm(e) {
    e.preventDefault();
    if (validateProductForm(productForm)) {
        const product = {
            name: productForm.NameInput.value,
            price: parseFloat(productForm.costInput.value).toFixed(2),
            stock: parseInt(productForm.stockInput.value, 10),
            description: productForm.descriptionInput.value,
        };
        console.log(updateProduct(product));
        if (updateProduct(product)) {
            window.location.href = "list.html";
        }
    }
}
