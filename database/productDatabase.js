const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, "..", "db.json");

async function readProducts() {
    const data = await fs.readFile(filePath, 'utf-8');

    return JSON.parse(data);
}

module.exports = {
    readProducts
};