const {
    readProducts,
    writeProducts
} = require("../database/productDatabase");


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


async function createProduct(product) {
    const products = await readProducts();

    products.push(product);

    await writeProducts(products);

    return product;
}


async function updateProduct(id, data) {
    const products = await readProducts();

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data
    };

    await writeProducts(products);

    return products[index];
}


async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeProducts(products);

    return deletedProduct;
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};