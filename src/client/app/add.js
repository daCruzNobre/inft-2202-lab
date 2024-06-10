import { saveProduct } from "./product.service.js";
import { Product } from "./product.js";

const addProductForm = document.querySelector(".addProductForm");
const errorParagraphs = document.querySelectorAll(".error");
const title = document.querySelector("h1");
let param = new URL(document.location).searchParams;
let name = param.get("name");

if (!name) {
    addProductForm.addEventListener("submit", submitProductForm);
}

export function validateProductForm(addProductForm) {
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

function submitProductForm(event) {
    event.preventDefault();
    let valid = validateProductForm(addProductForm);
    if (valid) {
        const newProduct = new Product(
            addProductForm.NameInput.value.trim(),
            parseFloat(addProductForm.costInput.value.trim()).toFixed(2),
            parseInt(addProductForm.stockInput.value.trim(), 10),
            addProductForm.descriptionInput.value.trim()
        );

        console.log(newProduct);

        let validName = saveProduct(newProduct);
        if (validName) {
            event.target.reset();
            window.location.href = "list.html";
        } else {
            console.log("Product with that name already exists");
            errorParagraphs[0].textContent = "Product with that name already exists";
            errorParagraphs[0].classList.remove("d-none");
        }
    } else {
        const errorPara = document.createElement('p');
        errorPara.classList.add("text-danger");
        errorPara.textContent = "Oops, something went wrong...";
        title.parentNode.insertBefore(errorPara, title.nextSibling);
    }
}
