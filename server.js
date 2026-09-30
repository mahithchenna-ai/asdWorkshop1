const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, "db.json");

async function readfile() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get all products
app.get("/products", async (req, res) => {
    try {
        const products = await readfile();

        await delay(3000);

        res.json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to read products"
        });
    }
});

// Get product by ID
app.get("/products/:id", async (req, res) => {
    try {
        const products = await readfile();

        await delay(3000);

        const id = Number(req.params.id);

        const product = products.find(p => p.id === id);

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
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});