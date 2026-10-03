const { readProducts } = require("../database/productDatabase");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAllProducts() {
    const products = await readProducts();

    await delay(1500);

    return products;
}

async function getProductById(id) {
    const products = await readProducts();

    await delay(1500);

    const product = products.find(p => p.id === id);

    return product;
}

module.exports = {
    getAllProducts,
    getProductById
};