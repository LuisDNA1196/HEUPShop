document.addEventListener("DOMContentLoaded", function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const searchTerm = urlParams.get("search");
    
        const searchResultHeader = document.getElementById("search-result-header");

        searchResultHeader.textContent = `Resultados de la búsqueda de "${searchTerm}"`;

        // Realizar una solicitud para obtener los productos de la base de datos
        fetch(`https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/`)
            .then(response => response.json())
            .then(data => {
                // Filtrar los productos que coinciden con el término de búsqueda
                const results = data.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase() === searchTerm
                );
    
                const resultsContainer = document.getElementById("results-container");
    
                resultsContainer.innerHTML = '';

                results.forEach(product => {
                    const productLink = document.createElement("a");
                    productLink.classList.add("product");
                    productLink.href = `detail-product.html?id=${product.id}`;
                    productLink.target = "_blank";
    
                    const productSubContainer = document.createElement("div");
                    productSubContainer.classList.add("category-text-container");
    
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
    
                    const productImage = document.createElement("img");
                    productImage.classList.add("producto-img");
                    productImage.src = product.url;
                    productImage.alt = product.name;
    
                    const productName = document.createElement("h3");
                    productName.classList.add("category-product-name");
                    productName.textContent = product.name;
    
                    const productPrice = document.createElement("p");
                    productPrice.classList.add("category-price");
                    productPrice.textContent = `$${product.price}`;
    
                    const productButton = document.createElement("button");
                    productButton.classList.add("category-detail-link");
                    productButton.innerHTML = 'Ver Detalles <i class="fa-solid fa-arrow-right-to-bracket"></i>';
                    productButton.addEventListener("click", () => {
                    });
    
                    productSubContainer.appendChild(productName);
                    productSubContainer.appendChild(productPrice);
                    productSubContainer.appendChild(productButton);
    
                    productCard.appendChild(productImage);
                    productCard.appendChild(productSubContainer);
    
                    productLink.appendChild(productCard);
                    resultsContainer.appendChild(productLink);
                });
            })
            .catch(error => {
                console.error("Error al obtener resultados de búsqueda:", error);
            });
    });
    