document.addEventListener("DOMContentLoaded", function () {
        // Obtener una referencia al contenedor de productos
        const productContainer = document.getElementById("product-details-container");
    
        // Agregar un evento de clic al contenedor para delegación de eventos
        productContainer.addEventListener("click", async function (e) {
            // Verificar si se hizo clic en un botón de eliminación
            if (e.target.classList.contains("category__product-delete")) {
                // Obtener la tarjeta del producto (product-card) padre del botón de eliminación
                const productCard = e.target.closest(".product-card");
    
                // Confirmar si el usuario desea eliminar el producto
                const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
    
                if (confirmDelete) {
                    // Obtener el ID del producto que deseas eliminar (puedes obtenerlo de tus datos)
                    const productId = productCard.dataset.id;
                    // Realizar una solicitud AJAX para eliminar el producto de la base de datos
                    try {
                        const response = await fetch(`https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/${productId}`, {
                            method: "DELETE", // Usar el método HTTP DELETE para eliminar
                            headers: {
                                'Content-Type': 'application/json'
                              }
                        });
    
                        if (response.ok) {
                            // Si la solicitud se completó correctamente, eliminar la tarjeta del producto del DOM
                            productCard.remove();
                        } else {
                            console.error("Error al eliminar el producto");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        });
    });
    