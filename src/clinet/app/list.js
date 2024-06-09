// Import methods from product.service.js
import { getProducts, updateProduct, deleteProduct, findProduct } from "./product.service.js";

// Get a reference to the message box
const messageBox = document.querySelector("#empty-message");
// Get a reference to the product table
const productTable = document.querySelector("#product-list");
const tbody = document.querySelector("tbody");
const pagination = document.querySelector(".pagination");

// Get a list of products from your service
const productList = getProducts();
const perPage = 5;  // Number of entries per page
let entriesAmount = productList.length;
let currentPage = 1;

drawProductTable(productList);

// Initiate tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Grab a reference to the modal
const modalDelete = document.querySelector("#modalDelete");
const exampleModal = new bootstrap.Modal('#exampleModal');

function drawProductTable(products) {
    tbody.replaceChildren(); // Delete all content from table body    
    // If there are no products in the list
    if (products === undefined || products.length === 0) {
        messageBox.classList.remove("d-none");
        productTable.classList.add("d-none");
    } else {
        messageBox.classList.add("d-none");
        productTable.classList.remove("d-none");
    }
    // For every product in the list
    products.forEach(product => {
        // Add a new row to the table element
        let newRow = document.createElement("tr");

        // Add a cell for each product property to the new row
        let newCell1 = document.createElement("td");
        newCell1.textContent = product.name;
        newRow.appendChild(newCell1);

        let newCell2 = document.createElement("td");
        newCell2.textContent = product.type;
        newRow.appendChild(newCell2);

        let newCell3 = document.createElement("td");
        newCell3.textContent = product.cost;
        newRow.appendChild(newCell3);

        let newCell4 = document.createElement("td");
        newCell4.textContent = product.description;
        newRow.appendChild(newCell4);

        // Add an extra cell to hold the buttons
        let newCell5 = document.createElement("td");

        // Create a delete button
        let newButton = document.createElement("span");
        newButton.setAttribute("type", "button");
        let icon = document.createElement("i"); // Create icon
        icon.classList.add("fa-solid", "fa-trash");
        // Set icon tooltips
        icon.setAttribute("data-bs-toggle", "tooltip");
        icon.setAttribute("data-bs-placement", "top");
        icon.setAttribute("data-bs-custom-class", "custom-tooltip");
        icon.setAttribute("data-bs-title", "Delete Product");
        // Bind modal to button
        newButton.setAttribute("data-bs-toggle", "modal");
        newButton.setAttribute("data-bs-target", "#exampleModal");
        // Add some classes to it
        newButton.classList.add("btn", "btn-danger", "my-1", "mx-1");
        newButton.appendChild(icon);
        // Add an event listener to it
        newButton.addEventListener("click", (event) => {
            event.preventDefault();
            modalDelete.addEventListener("click", (event) => {
                event.preventDefault();
                if (deleteProduct(product.name)) {
                    let newList = getProducts();
                    drawProductTable(newList);
                    exampleModal.hide();
                } else {
                    let newCell6 = document.createElement("td");
                    newCell6.textContent = "Could not delete";
                    newRow.appendChild(newCell6);
                }
            });
        });

        // Use the reference to the button cell to add the delete button
        newCell5.appendChild(newButton);

        // Create an edit link
        let editLink = document.createElement("a");
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-file-pen");
        editIcon.setAttribute("data-bs-toggle", "tooltip");
        editIcon.setAttribute("data-bs-placement", "top");
        editIcon.setAttribute("data-bs-custom-class", "custom-tooltip");
        editIcon.setAttribute("data-bs-title", "Edit Product");

        // Add some classes to it (so it looks like a button)
        editLink.classList.add("btn", "btn-primary", "my-1", "mx-1");
        // Add an icon or some text
        editLink.appendChild(editIcon);
        // Set the href to point to the add page, add a GET param called name and set the product name
        editLink.href = `../client/add.html?name=${product.name}`;
        // Use the reference to the button cell to add the edit link
        newCell5.appendChild(editLink);

        newRow.appendChild(newCell5);
        tbody.appendChild(newRow);
    });
}

function getPaginatedData(page, perPage, data) {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
}


