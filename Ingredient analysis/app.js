const express = require('express');
const app = express();
const port = 3000;

const products = [
    { id: 1, name: 'Example Product', description: 'This is a sample product.', healthScore: 80, isDeceptive: false },
    // Add more sample products as needed
];
aas
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
