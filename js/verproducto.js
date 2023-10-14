document.addEventListener('DOMContentLoaded', () => {
        const productDetailContainer = document.getElementById('product-detail-container');
    
        // Manejar el clic en los enlaces "Ver producto"
        const productLinks = document.querySelectorAll('.product');
    
        productLinks.forEach((link) => {
            link.addEventListener('click', async (event) => {
                event.preventDefault(); // Evita que el enlace redireccione de inmediato
    
                // Obtener el ID del producto desde el atributo data-product-id
                const productId = link.getAttribute('data-product-id');
    
                try {
                    // Hacer una solicitud para obtener los datos del producto desde db.json
                    const response = await fetch(`https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/`);
                    const data = await response.json();
    
                    // Buscar el producto en todas las categorías
                    let product = null;
                    Object.values(data).forEach((categoryProducts) => {
                        const foundProduct = categoryProducts.find((item) => item.id === parseInt(productId));
                        if (foundProduct) {
                            product = foundProduct;
                        }
                    });
    
                    if (product) {
                        // Generar el contenido HTML para mostrar los detalles del producto
                        const productHTML = `
                            <h2>${product.nombre}</h2>
                            <p>${product.descripcion}</p>
                            <p>Precio: $${product.precio}</p>
                            <!-- Agrega más detalles del producto según sea necesario -->
                        `;
    
                        // Actualiza el contenido en el contenedor
                        productDetailContainer.innerHTML = productHTML;
                    } else {
                        productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
                    }
                } catch (error) {
                    console.error('Error al cargar los detalles del producto:', error);
                }
            });
        });
    });
    