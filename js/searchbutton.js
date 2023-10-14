document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-icon"); // Si tienes un botón para iniciar la búsqueda
    
        // Agregar un evento de escucha al input de búsqueda
        searchInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                // Obtener el valor del input de búsqueda
                const searchTerm = searchInput.value.toLowerCase();
                
                // Realizar una solicitud para obtener los productos de la base de datos
                fetch(`https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/`)
                    .then(response => response.json())
                    .then(data => {
                        // Filtrar los productos que coinciden con el término de búsqueda
                        const results = data.filter(product =>
                            product.name.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase() === searchTerm
                        );
                        
                        // Redirigir a la página de resultados de búsqueda
                        const queryString = `?search=${encodeURIComponent(searchTerm)}`;
                        const url = `search.html${queryString}`;
                        window.location.href = url;
                    })
                    .catch(error => {
                        console.error("Error al buscar productos:", error);
                    });
            }
        });
    
        // Si tienes un botón para iniciar la búsqueda, puedes usar este evento
        searchButton.addEventListener("click", function () {
            const searchTerm = searchInput.value.toLowerCase();
            // Resto del código igual que el evento anterior
            // ...
        });
    });
    