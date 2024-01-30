function searchProduct() {
    const searchInput = document.getElementById('search-input');
    const productInfoContainer = document.getElementById('product-info');
    const productId = parseInt(searchInput.value);

    if (isNaN(productId) || productId <= 0) {
        productInfoContainer.innerHTML = 'Please enter a valid product ID.';
        return;
    }

    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            displayProductInfo(productInfoContainer, product);
        })
        .catch(error => {
            productInfoContainer.innerHTML = 'Error retrieving product information.';
            console.error(error);
        });
}

function displayProductInfo(container, product) {
    container.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Health Score: ${product.healthScore}</p>
        <p>${product.isDeceptive ? 'This product may have deceptive advertising.' : ''}</p>
    `;
}
