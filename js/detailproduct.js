document.addEventListener("DOMContentLoaded", function () {
        // Obtener el "id" de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        // Realizar una solicitud AJAX para obtener los datos del producto desde db.json
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                // Encuentra el producto correspondiente en la base de datos
                const productData = data.products.find(product => product.id === productId);

                if (productData) {
                    // Actualizar los elementos en la página con los detalles del producto
                    const productImage = document.getElementById("product-image");
                    productImage.src = productData.url;

                    const productName = document.getElementById("product-name");
                    productName.textContent = productData.name;

                   

                    const productPrice = document.getElementById("product-price");
                    productPrice.textContent = `$${productData.price}`;

                    const productDescription = document.getElementById("product-description");
                    productDescription.textContent = productData.description
                } else {
                    console.error("Producto no encontrado");
                }
            } else {
                console.error("Error al cargar el archivo JSON");
            }
        };

        xhr.send();
    });