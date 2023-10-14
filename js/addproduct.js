document.addEventListener("DOMContentLoaded", function () {
        const productForm = document.querySelector('.add-product__form');
    
        productForm.addEventListener("submit", async function (e) {
            e.preventDefault();
    
            const name = document.querySelector('#product-name').value;
            const category = document.querySelector('#category').value;
            const url = document.querySelector('#img').value;
            const price = parseFloat(document.querySelector('#price').value);
            const description = document.querySelector('#description').value;
    
            // Verificar que los campos no estén vacíos
            if (!name || !category || !url || isNaN(price) || !description) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }
    
            // Crear un objeto de producto
            const product = {
                name: name,
                category: category,
                url: url,
                price: price,
                description: description,
            };
    
            try {
                // Realizar una solicitud AJAX para agregar el producto a db.json
                const response = await fetch('https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/', {
                    method: 'POST', // Usar el método HTTP POST para agregar
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product), // Convertir el objeto a JSON
                });
    
                if (!response.ok) {
                    throw new Error('Error al agregar el producto');
                }
    
                // Limpiar el formulario
                productForm.reset();
    
                alert("Producto agregado con éxito.");
            } catch (error) {
                console.error(error);
            }
        });
    });
    