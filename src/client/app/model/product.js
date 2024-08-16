// Create and export a new constructor that creates a Product object.
export function Product(name, price, stock, description) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
}

Product.prototype.toString = function() {
    return `${this.name} costs $${this.price.toFixed(2)}. ${this.stock} in stock. Description: ${this.description}`;
};