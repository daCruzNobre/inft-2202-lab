// apikey// Import methods from product.service.js
// import { getProducts, deleteProduct } from "./product.service.mock.js";
import { ProductService as ProductServiceConstructor } from "./product.service.js";
// import { key } from "../../apikey.js";

// const host = "https://inft2202.paclan.net/api/products/"
const host = "http://localhost:3000/api/products/"

const productService = new ProductServiceConstructor(host);
// Get a reference to the message box
const messageBox = document.querySelector("#empty-message");
// Get a reference to the product group
const productGroup = document.querySelector("#product-group");
// get reference for the dropdownmenu itens
const dropMenuItems = document.querySelectorAll(".dpItem");
// get a reference for the pagination group
const paginationElement = document.querySelector(".pagination");
// get a reference to the spinner
const spinner = document.querySelector('.fa-spinner');

// grab a reference to the modal
const modalDelete = document.querySelector("#modalDelete");
const exampleModal = new bootstrap.Modal('#exampleModal');

let currentPage = 1;
let perPage = 5;

// Initialize the page with URL parameters or defaults
initPage();

// const productFInd = await productService.findProduct("66941d40392a14a4f5679ec1");
// console.log(productFInd);
async function initPage() {
    const params = new URLSearchParams(window.location.search);
    currentPage = parseInt(params.get('page')) || 1;
    perPage = parseInt(params.get('perPage')) || 5;

    try {
        spinner.classList.remove("d-none");
        await fetchAndRenderProducts();
        spinner.classList.add("d-none");
      } catch (error) {
        console.error(error);
        spinner.classList.add("d-none");
    }
}

// Fetch products and draw them
async function fetchAndRenderProducts() {
    try {
        spinner.classList.remove("d-none");
        messageBox.classList.add("d-none");
        productGroup.classList.add("d-none");

        const products = await productService.getProducts(currentPage, perPage);
        console.log(currentPage, perPage)
        const pagination = await productService.getPagination(currentPage, perPage);

        console.log("working");
        console.log(products);
        console.log(pagination);
        
        drawProductGroup(products);
        drawPagination(pagination);
        spinner.classList.add("d-none");
        
    } catch (error) {
        spinner.classList.add("d-none");
        messageBox.classList.remove("d-none");
    }
}

// Draw the product group
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
  console.log(products);
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
      let date = document.createElement("li");
      let stock = document.createElement("li");
      console.log(card)
      // Add classes and attributes
      card.classList.add("card");
      // card.setAttribute("style", "max-width: 17rem");
      cardBody.classList.add("card-body");
      cardFooter.classList.add("card-footer");
      title.classList.add("card-title");
      description.classList.add("card-text");
      list.classList.add("list-group", "list-group-flush");
      cost.classList.add("list-group-item");
      date.classList.add("list-group-item");
      stock.classList.add("list-group-item");
      img.classList.add("card-img-top");
      img.setAttribute("src", "./img/bag-1455765_640.jpg");
      img.setAttribute("alt", "Product image");
      img.setAttribute("style", "width: 16rem");
      
    //   console.log(card)
      // Set the contents
      title.textContent = product.name;
      description.textContent = product.description;
      cost.textContent = `Cost: $${product.price}`;
      date.textContent = `Listed at: ${product.createdAt}`;
      stock.textContent = `Stock: ${product.stock}`;
      
    //   console.log(title)
      // Assemble the card
      card.appendChild(img);
      card.appendChild(cardBody);
      card.appendChild(list);
      card.appendChild(cardFooter);
      
      cardBody.appendChild(title);
      cardBody.appendChild(description);

      list.appendChild(stock);
      list.appendChild(cost);
      list.appendChild(date);

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
              console.log(product._Id);
              const responseStatus = await productService.deleteProduct(product.productId);
              if (responseStatus !== 200 && responseStatus !== 204 ) {
                throw new Error("Could not delete");
              } else {
                let newList = await productService.getProducts(currentPage, perPage);
                drawProductGroup(newList);
                exampleModal.hide();
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
      console.log(product._id)
      editLink.href = `../add.html?id=${product._id}`;

      // Append buttons to card footer
        cardFooter.appendChild(editLink);
        cardFooter.appendChild(deleteButton);
      cardFooter.appendChild(addToCartButton);
      
      productGroup.appendChild(card);
  });
}

// Draw the pagination controls
function drawPagination(pagination) {
    paginationElement.replaceChildren();

    const { page, perPage, pages } = pagination;

    for (let index = 1; index <= pages; index++) {
        const pageItem = document.createElement("li");
        const pageLink = document.createElement("a");
        pageItem.classList.add("page-item");
        pageLink.classList.add("page-link");
        pageLink.href = `list.html?page=${index}&perPage=${perPage}`;
        pageLink.textContent = index;

        pageItem.appendChild(pageLink);
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = index;
            updateUrlAndFetchProducts();
        });

        paginationElement.appendChild(pageItem);
    }

    // Create previous button
    const previousLink = document.createElement("a");
    const previousButton = document.createElement("li");
    previousButton.classList.add("page-item");
    previousLink.classList.add("page-link");
    previousLink.textContent = "Previous";
    previousButton.appendChild(previousLink);
    paginationElement.prepend(previousButton);

    if (currentPage === 1) {
        previousButton.classList.add("disabled");
    } else {
        previousLink.href = `list.html?page=${currentPage - 1}&perPage=${perPage}`;
        previousLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage -= 1;
            updateUrlAndFetchProducts();
        });
    }

    // Create next button
    const nextLink = document.createElement("a");
    const nextButton = document.createElement("li");
    nextButton.classList.add("page-item");
    nextLink.classList.add("page-link");
    nextLink.textContent = "Next";
    nextButton.appendChild(nextLink);
    paginationElement.appendChild(nextButton);

    if (currentPage === pages) {
        nextButton.classList.add("disabled");
    } else {
        nextLink.href = `list.html?page=${currentPage + 1}&perPage=${perPage}`;
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage += 1;
            updateUrlAndFetchProducts();
        });
    }
}

// Update the URL and fetch products
function updateUrlAndFetchProducts() {
    const newUrl = `list.html?page=${currentPage}&perPage=${perPage}`;
    const newTitle = `List Page ${currentPage}`;
    const newState = { additionalInformation: `List Page ${currentPage}` };
    window.history.replaceState(newState, newTitle, newUrl);

    fetchAndRenderProducts();
}

// Event listener for dropdown items
dropMenuItems.forEach((item) => {
    item.addEventListener("click", async (event) => {
        perPage = Number(item.textContent);
        currentPage = 1; // Reset to first page when perPage changes
        updateUrlAndFetchProducts();
    });
});