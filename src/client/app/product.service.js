import { Product } from './product.js';

export function ProductService(host, apikey){
  this.host = host;
  this.apikey = apikey;
}

/*
 * Find a product by name
 */
ProductService.prototype.findProduct = async function(productId) {
  // console.log(productId);
  const url = new URL(`${this.host}${productId}`);
  // console.log(url);       
  const headers = new Headers({
      'apikey': this.apikey,
      'content-type': "application/json",
  });
  const request = new Request(url, {
      headers,
      method: 'GET',      
  })
  try {
      const response = await fetch(request);
      const data = await response.json();
      // console.log(data);
      return data
  } catch (error) {        
      console.log(error);
  }
}

/*
 * Update an existing product
 */
ProductService.prototype.updateProduct = async function(productId, product) {
  const url = new URL(`${this.host}${productId}`);
  console.log(url);        
    const headers = new Headers({
        'apikey': this.apikey,
        'content-type': "application/json",
    });
    
    const request = new Request(url, {
        headers,
        method: 'PUT',
        body: JSON.stringify(product),     
    })
    try {
        const response = await fetch(request);
        const data = await response.json();
        console.log(data);
    } catch (error) {        
        console.log(error);
    }
  // // Get a list of products
  // const products = getProducts();
  // // Find the index of the product we're trying to update
  // let productIndex = products.findIndex(p => p.name.toLowerCase() === product.name.toLowerCase());
  // // If the product doesn't exist, return false
  // if (productIndex === -1) {
  //   return false;
  // } else {
  //   // Use the index to update the fields for the selected product
  //   products[productIndex] = product;
  //   // Put the new list back into storage
  //   localStorage.setItem("products", JSON.stringify(products));
  //   // Return true if everything is good
  //   return true;
  // }
}

/*
 * Delete a product by name
 */
ProductService.prototype.deleteProduct = function(productName) {
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
ProductService.prototype.getProducts = async function(page=1, perPage=5) {
  const url = new URL(this.host);
  url.searchParams.append('page', page);
  url.searchParams.append('perPage', perPage);
  console.log(url);
  const headers = new Headers({
    'apikey': this.apikey
  });
  const request = new Request(url,{
    headers,
    method:'GET'
  });
  try {
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
    console.log(data.records);
    return data.records
  } catch (error) {
    console.log(error);
  }
}

/*
 * Save a new product
 */
ProductService.prototype.saveProduct = async function(product) {
  const url = new URL(this.host);
  const headers = new Headers({
    'apikey': this.apikey,
    'Content-Type': 'application/json'});
  console.log(product);
//   const body = {
//     name: product.name,
//     description: product.description,
//     stock: product.stock,
//     price: product.price,
// }
  const request = new Request(url,{
    headers,
    method:'POST',
    body: JSON.stringify(product),
  });
  try {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    // return data.pagination
  } catch (error) {
    console.log(error);
  }

  // const products = getProducts();
  // if (products.find(p => p.name.toLowerCase() === product.name.toLowerCase())) {
  //   return false;
  // }

  // products.push(product);
  // localStorage.setItem("products", JSON.stringify(products));
  // return true;
}

/**
 * Get pagination
 */
ProductService.prototype.getPagination = async function(page=1, perPage=5){
  const url = new URL(this.host);
  url.searchParams.append('page', page);
  url.searchParams.append('perPage', perPage);
  console.log(url);
  const headers = new Headers({
    'apikey': this.apikey
  });
  const request = new Request(url,{
    headers,
    method:'GET'
  });
  try {
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data.records);
    return data.pagination
  } catch (error) {
    console.log(error);
  }
}
