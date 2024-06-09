import { getProducts, saveProduct } from "./product.service.js";

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

    if (addProductForm.NameInput.value.trim() === "") {
        errorParagraphs[0].textContent = "Please, enter a valid name";
        errorParagraphs[0].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[0].classList.add("d-none");
    }

    if (addProductForm.typeInput.value.trim() === "") {
        errorParagraphs[1].textContent = "Please, enter a valid type";
        errorParagraphs[1].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[1].classList.add("d-none");
    }

    if (addProductForm.costInput.value.trim() === "" || isNaN(Number(addProductForm.costInput.value)) || Number(addProductForm.costInput.value) < 0) {
        errorParagraphs[2].textContent = "Please, enter a valid cost";
        errorParagraphs[2].classList.remove("d-none");
        isValid = false;
    } else {
        errorParagraphs[2].classList.add("d-none");
    }

    if (addProductForm.descriptionInput.value.trim() === "") {
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
        const newProduct = {
            name: addProductForm.NameInput.value.trim(),
            type: addProductForm.typeInput.value.trim(),
            cost: addProductForm.costInput.value.trim(),
            description: addProductForm.descriptionInput.value.trim(),
        };

        let validName = saveProduct(newProduct);
        if (validName) {
            event.target.reset();
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
