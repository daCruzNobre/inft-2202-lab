import tmplAdd from './add.ejs';
import { ProductService as ProductServiceConstructor } from "../../model/product.service.js";
import { Product } from "../../model/product.js";

const host = "http://localhost:3000/api/products/";
const productService = new ProductServiceConstructor(host);

export default async () => {
    console.log('loadingAdd');

    // Render the template into the #app element
    const strAdd = tmplAdd();
    document.getElementById('app').replaceChildren();
    document.getElementById('app').innerHTML = strAdd;

    // Initialize the page
    await onInit();

    // Set up event listeners and other post-render configurations
    onRender();
}

async function onInit() {
    const param = new URL(document.location).searchParams;
    const _id = param.get("id");

    if (!_id) {
        console.log("we are adding");
    } else {
        console.log("Product ID found, this is not for adding a new product.");
        // window.location.href = "list"; 
    }
}

function onRender() {
    const addProductForm = document.querySelector(".addProductForm");
    const spinner = document.querySelector('.fa-spinner');

    // Attach submit event listener for form submission
    addProductForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let valid = validateProductForm(addProductForm);

        if (valid) {
            const newProduct = new Product(
                addProductForm.NameInput.value.trim(),
                parseFloat(addProductForm.costInput.value.trim()).toFixed(2),
                parseInt(addProductForm.stockInput.value.trim(), 10),
                addProductForm.descriptionInput.value.trim()
            );

            try {
                spinner.classList.remove("d-none");
                await productService.saveProduct(newProduct);
                event.target.reset();  
                spinner.classList.add("d-none");
                const successMessage = document.querySelector(".alert-info");
                successMessage.textContent = "Product added to product list";
                successMessage.classList.remove("d-none");
            } catch (nameError) {
                console.error("Product with that name already exists");
                const errorParagraph = document.querySelector(".error-message");
                errorParagraph.textContent = "Product with that name already exists";
                errorParagraph.classList.remove("d-none");
                spinner.classList.add("d-none");
            }
        }
    });
}

export function validateProductForm(addProductForm) {
    const errorParagraphs = document.querySelectorAll(".error");
    let isValid = true;

    if (addProductForm.NameInput.value === "") {
        errorParagraphs[0].textContent = "Please, enter a valid name";
        errorParagraphs[0].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[0].classList.add("d-none");
    }

    if (addProductForm.costInput.value === "" || isNaN(Number(addProductForm.costInput.value)) || Number(addProductForm.costInput.value) < 0) {
        errorParagraphs[1].textContent = "Please, enter a valid cost";
        errorParagraphs[1].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[1].classList.add("d-none");
    }

    if (addProductForm.stockInput.value === "" || isNaN(Number(addProductForm.stockInput.value)) || Number(addProductForm.stockInput.value) < 0) {
        errorParagraphs[2].textContent = "Please, enter a valid stock quantity";
        errorParagraphs[2].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[2].classList.add("d-none");
    }

    if (addProductForm.descriptionInput.value === "") {
        errorParagraphs[3].textContent = "Please, enter a product description";
        errorParagraphs[3].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[3].classList.add("d-none");
    }

    return isValid;
}
