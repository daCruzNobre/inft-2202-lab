/*
 * Find a product by name
 */
export function findProduct(productName) {
    const products = getProducts();      
    return products.find(product => product.name.toLowerCase() === productName.toLowerCase());
}

/*
 * Update an existing product
 */
export function updateProduct(product) {
    // Get a list of products
    const products = getProducts();
    // Find the index of the product we're trying to update   
    let productIndex = products.findIndex(p => p.name.toLowerCase() === product.name.toLowerCase());
    // If the product doesn't exist, return false
    if (productIndex === -1) {
        return false;
    } else {
        // Use the index to update the fields for the selected product
        products[productIndex] = product;            
        // Put the new list back into storage       
        localStorage.setItem("products", JSON.stringify(products));
        // Return true if everything is good
        return true;
    }
}

/*
 * Delete a product by name
 */
export function deleteProduct(productName) {
    // Get a list of products
    const products = getProducts();
    // Find the index of the product we're trying to delete
    let productIndex = products.findIndex(product => product.name.toLowerCase() === productName.toLowerCase());   
    // If the product doesn't exist, return false
    if (productIndex === -1) {
        return false;
    } else {       
        // Cut the selected product out of the list
        products.splice(productIndex, 1);
        // Put the new list back into storage        
        localStorage.setItem("products", JSON.stringify(products));        
        // Return true if everything is good
        return true;
    }
}

/*
 * Get all products
 */
export function getProducts() {
    let products = localStorage.getItem('products');
    // Check if there is a products array in the storage
    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }

    return products;
}

/*
 * Save a new product
 */
export function saveProduct(product) {
    const products = getProducts();
    if (products.find(p => p.name === product.name)) {
        return false;
    }
    
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    return true;
}
