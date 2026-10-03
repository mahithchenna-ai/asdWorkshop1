const productService = require("../services/productService");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        res.json(products);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: "Failed to read products"
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json(product);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: "Failed to read products"
        });
    }
}

module.exports = {
    getProducts,
    getProductById
};