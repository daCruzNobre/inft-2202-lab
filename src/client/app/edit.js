// Import methods from product.service.js and add.js
import { findProduct, updateProduct } from "./product.service.js";
import { validateProductForm } from "./add.js";

// Look in the URL to see if there is a name parameter
const param = new URL(document.location).searchParams;
const name = param.get("name");
const title = document.querySelector("title"); 
const heading = document.querySelector(".heading"); 
const productForm = document.querySelector(".addProductForm");
const submitBtn = document.querySelector(".submitBtn");

// If so, call setupEditForm();
if (name) {
    setupEditForm();
}

function setupEditForm() {
    heading.textContent = "Edit Product";
    title.textContent = "Edit";
    let product = findProduct(name);
    productForm.NameInput.value = product.name;
    productForm.typeInput.value = product.type;
    productForm.costInput.value = product.cost;
    productForm.descriptionInput.value = product.description;
    submitBtn.textContent = "Edit Product";
   
    // Set name to disabled
    productForm.NameInput.disabled = true;

    productForm.addEventListener("submit", submitEditForm);
}

function submitEditForm(e) {
    e.preventDefault();
    if (validateProductForm(productForm)) {
        const product = {
            name: productForm.NameInput.value,
            type: productForm.typeInput.value,
            cost: productForm.costInput.value,
            description: productForm.descriptionInput.value,
        };
        console.log(updateProduct(product));
        if (updateProduct(product)) {
            window.location.href = "list.html";
        }
    }
}
