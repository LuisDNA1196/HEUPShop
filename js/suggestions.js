document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.querySelector(".search-input");
        const suggestionsList = document.getElementById("suggestions-list");
    
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();
            suggestionsList.innerHTML = ''; // Limpiar sugerencias previas
    
            // Realizar una solicitud para obtener los productos de la base de datos
            fetch(`https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/`)
                .then(response => response.json())
                .then(data => {
                    // Filtrar los productos que coinciden con el término de búsqueda
                    const suggestions = data.filter(product =>
                        product.name.toLowerCase().includes(searchTerm) ||
                        product.category.toLowerCase() === searchTerm
                    );
    
                    // Mostrar las sugerencias en la lista
                    suggestions.forEach(product => {
                        const suggestionItem = document.createElement("li");
                        suggestionItem.textContent = product.name;
    
                        // Agregar un evento clic para llenar el campo de búsqueda con la sugerencia seleccionada
                        suggestionItem.addEventListener("click", () => {
                            searchInput.value = product.name;
                            suggestionsList.innerHTML = ''; // Limpiar sugerencias al seleccionar una
                        });
    
                        suggestionsList.appendChild(suggestionItem);
                    });
                })
                .catch(error => {
                    console.error("Error al obtener sugerencias:", error);
                });
        });
    });
    