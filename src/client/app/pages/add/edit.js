import tmplAdd from './add.ejs';
import { ProductService as ProductServiceConstructor } from "../../model/product.service.js";
import { Product } from "../../model/product.js";
import { validateProductForm } from "./add.js";

const host = "http://localhost:3000/api/products/";
const productService = new ProductServiceConstructor(host);

export default async () => {
    console.log('loadingAdd');
    
    const strAdd = tmplAdd();
    document.getElementById('app').replaceChildren();
    document.getElementById('app').innerHTML = strAdd;

    await onInit();
    
    onRender();
}

async function onInit() {
    const param = new URL(document.location).searchParams;
    const _id = param.get("id");

    if (_id) {
        try {
            console.log("we are editing");
            const product = await productService.findProduct(_id);
            setupEditForm(product);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    } else {
        console.log("No product ID found, redirecting...");
        window.location.href = "list";
    }
}

function setupEditForm(product) {
    const heading = document.querySelector(".heading");
    const title = document.querySelector("title");
    const productForm = document.querySelector(".addProductForm");
    const submitBtn = document.querySelector(".submitBtn");

    heading.textContent = "Edit Product";
    title.textContent = "Edit";

    productForm.NameInput.value = product.name;
    productForm.costInput.value = product.price;
    productForm.stockInput.value = product.stock;
    productForm.descriptionInput.value = product.description;

    productForm.NameInput.disabled = true;

    submitBtn.textContent = "Update Product";
}

function onRender() {
    const productForm = document.querySelector(".addProductForm");
    const submitBtn = document.querySelector(".submitBtn");
    const spinner = document.querySelector('.fa-spinner');

    // Attach submit event listener for form submission
    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const param = new URL(document.location).searchParams;
        const _id = param.get("id");
        if (_id && validateProductForm(productForm)) {
            const product = new Product(
                productForm.NameInput.value,
                Number(productForm.costInput.value),
                Number(productForm.stockInput.value),
                productForm.descriptionInput.value
            );

            try {
                spinner.classList.remove("d-none");
                await productService.updateProduct(_id, product);
                spinner.classList.add("d-none");
                window.location.href = "list";
            } catch (error) {
                spinner.classList.add("d-none");
                console.error("Update failed:", error);
            }
        }
    });
}
