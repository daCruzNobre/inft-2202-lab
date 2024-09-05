import tmplList from './list.ejs';
import { ProductService as ProductServiceConstructor } from '../../model/product.service.js';
import { Modal } from 'bootstrap';

const host = "http://localhost:3000/api/products/";
const ProductService = new ProductServiceConstructor(host);

export default async () => {
    console.log('loadingList');
    
    const { products, pagination } = await onInit(host);
    const strList = tmplList({ products, pagination });
    
    document.getElementById('app').replaceChildren();
    document.getElementById('app').innerHTML = strList;
    
    onRender();
}

async function onInit(host) {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get('page')) || 1;
    const perPage = parseInt(params.get('perPage')) || 5;
    try {
        const products = await ProductService.getProducts(currentPage, perPage);
        const pagination = await ProductService.getPagination(currentPage, perPage);
        console.log(pagination.page);
        return { products, pagination };
    } catch (error) {
        console.error(error);
        return { products: [], pagination: { page: 1, perPage: 5, pages: 1 } };
    }
}

function onRender() {
    // Handle the dropdown menu items for changing the number of items per page
    const dropMenuItems = document.querySelectorAll(".dpItem");
    dropMenuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const perPage = Number(item.textContent);
            updateUrlAndFetchProducts({ perPage, currentPage: 1 });
        });
    });
    
    const exampleModal = new Modal('#exampleModal');
    // const exampleModal = new Modal('#exampleModal');
    // Set up event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const productId = event.currentTarget.getAttribute('data-product-id');
            await handleDelete(productId, exampleModal);
        });
    });
}

async function handleDelete(productId, exampleModal) {
    const modalDelete = document.querySelector("#modalDelete");
    
    modalDelete.addEventListener("click", async (event) => {
        event.preventDefault();
        
        try {
            const responseStatus = await ProductService.deleteProduct(productId);
            if (responseStatus === 200 || responseStatus === 204) {
                const { products, pagination } = await onInit(host);
                const strList = tmplList({ products, pagination });
                document.getElementById('app').innerHTML = strList;
                console.log(exampleModal);
                exampleModal.hide();
                onRender();
            } else {
                throw new Error("Could not delete");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }, { once: true });
}

function updateUrlAndFetchProducts({ currentPage = 1, perPage = 5 } = {}) {
    const newUrl = `list?page=${currentPage}&perPage=${perPage}`;
    const newTitle = `List Page ${currentPage}`;
    const newState = { additionalInformation: `List Page ${currentPage}` };
    window.history.replaceState(newState, newTitle, newUrl);

    fetchAndRenderProducts(currentPage, perPage);
}

async function fetchAndRenderProducts(currentPage, perPage) {
    const { products, pagination } = await onInit(host);
    const strList = tmplList({ products, pagination });
    document.getElementById('app').innerHTML = strList;
    onRender();
}
