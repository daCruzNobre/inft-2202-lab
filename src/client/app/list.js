// Import methods from product.service.js
// import { getProducts, deleteProduct } from "./product.service.mock.js";
import { ProductService as ProductServiceConstructor } from "./product.service.js";
import { key } from "../../apikey.js";

const host = "https://inft2202.paclan.net/api/products/"

const productService = new ProductServiceConstructor(host, key);
// Get a reference to the message box
const messageBox = document.querySelector("#empty-message");
// Get a reference to the product group
const productGroup = document.querySelector("#product-group");

// Get a list of products from your service
console.log(productService);
const productList =  await productService.getProducts();
console.log(productList);
drawProductGroup(productList);

// Grab a reference to the modal
const modalDelete = document.querySelector("#modalDelete");
const exampleModal = new bootstrap.Modal('#exampleModal');

function drawProductGroup(products) {
    productGroup.replaceChildren(); // Delete all content from product group
    
    // If there are no products in the list
    if (products === undefined || products.length === 0) {
        messageBox.classList.remove("d-none");
        productGroup.classList.add("d-none");
    } else {
        messageBox.classList.add("d-none");
        productGroup.classList.remove("d-none");
    }
    
    // For every product in the list
    products.forEach(product => {
        // Create a new Card Element
        let card = document.createElement("div");
        let img = document.createElement("img");
        let cardBody = document.createElement("div");
        let cardFooter = document.createElement("div");
        let title = document.createElement("h5");
        let description = document.createElement("p");
        let list = document.createElement("ul");
        let cost = document.createElement("li");
        let type = document.createElement("li");

        // Add classes and attributes
        card.classList.add("card");
        card.setAttribute("style", "max-width: 17rem");
        cardBody.classList.add("card-body");
        card.classList.add("card");
        cardFooter.classList.add("card-footer");
        title.classList.add("card-title");
        description.classList.add("card-text");
        list.classList.add("list-group", "list-group-flush");
        cost.classList.add("list-group-item");
        type.classList.add("list-group-item");
        img.classList.add("card-img-top");
        img.setAttribute("src", "./img/bag-1455765_640.jpg");
        img.setAttribute("alt", "Product image");
        img.setAttribute("style", "width: 16rem");
        
        // Set the contents
        title.textContent = product.name;
        description.textContent = product.description;
        console.log(product.price);
        console.log(product.stock);
        cost.textContent = `Cost: $${product.price}`;
        type.textContent = `Stock: ${product.stock}`;

        // Assemble the card
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(list);
        card.appendChild(cardFooter);

        cardBody.appendChild(title);
        cardBody.appendChild(description);

        list.appendChild(type);
        list.appendChild(cost);

        // Create a delete button
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteButton.classList.add("btn", "btn-danger", "my-1", "mx-1");
        deleteButton.appendChild(deleteIcon);
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", "#exampleModal");

        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            modalDelete.addEventListener("click", async (event) => {
                event.preventDefault();
                if (deleteProduct(product.name)) {
                    let newList = await productService.getProducts();
                    drawProductGroup(newList);
                    exampleModal.hide();
                } else {
                    console.log("Could not delete");
                }
            }, { once: true });
        });

        // Create an add to cart button
        let addToCartButton = document.createElement("button");
        let cartIcon = document.createElement("i");
        cartIcon.classList.add("fa-solid", "fa-cart-plus");
        addToCartButton.classList.add("btn", "btn-primary", "my-1", "mx-1");
        addToCartButton.appendChild(cartIcon);

        // Create an edit link
        let editLink = document.createElement("a");
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-file-pen");
        editLink.classList.add("btn", "btn-primary", "my-1", "mx-1");
        editLink.appendChild(editIcon);
        editLink.href = `../client/add.html?name=${product.name}`;

        // Append buttons to card footer
        cardFooter.appendChild(addToCartButton);
        cardFooter.appendChild(editLink);
        cardFooter.appendChild(deleteButton);

        productGroup.appendChild(card);
    });
}
