document.addEventListener("DOMContentLoaded", function () {
    // Realizar una solicitud AJAX para obtener los datos del producto desde db.json
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./db.json", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            // Obtener una referencia al elemento donde deseas mostrar los detalles del producto
            const productDetailsContainer = document.getElementById("product-details-container");

            // Iterar a través de los productos y mostrar sus detalles
            data.products.forEach(product => {
                const productContainer = document.createElement("div");
                productContainer.classList.add("product-container-admin");

                const productSubContainer = document.createElement("div");
                productSubContainer.classList.add("product-card");
                // Crear elementos para mostrar los detalles del producto
                const productNameElement = document.createElement("h2");
                productNameElement.textContent = `${product.name}`;
                productNameElement.classList.add("product-name-admin");

                const productCategoryElement = document.createElement("p");
                productCategoryElement.textContent = `Categoría: ${product.category}`;
                productCategoryElement.classList.add("product-category-admin");

                const productPriceElement = document.createElement("p");
                productPriceElement.textContent = `$${product.price}`;
                productPriceElement.classList.add("product-price-admin");

                const productImageElement = document.createElement("img");
                productImageElement.src = product.url;
                productImageElement.alt = product.name;
                productImageElement.classList.add("product-img-admin");

                productContainer.appendChild(productSubContainer);
                // Agregar los elementos al contenedor del producto
                productSubContainer.appendChild(productImageElement);
                productSubContainer.appendChild(productNameElement);
                productSubContainer.appendChild(productCategoryElement);
                productSubContainer.appendChild(productPriceElement);

                // Agregar el código adicional debajo de cada producto
                const actionsBox = document.createElement("div");
                actionsBox.classList.add("category__actions-box");

                const editLink = document.createElement("a");
                editLink.classList.add("category__product-edit");
                editLink.href = `./edit-product.html?id=${product.id}`;
                editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("category__product-delete");
                deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

                actionsBox.appendChild(editLink);
                actionsBox.appendChild(deleteButton);

                productSubContainer.appendChild(actionsBox);

                // Agregar el contenedor del producto al contenedor principal en tu HTML
                productDetailsContainer.appendChild(productSubContainer);

                // Agregar un evento de clic para manejar la eliminación del producto
                deleteButton.addEventListener("click", async () => {
                    // Obtener el nombre del producto
                    const productName = product.name;

                    // Mostrar una alerta de confirmación
                    const confirmDelete = confirm(`¿Desea eliminar el producto "${productName}"?`);

                    if (confirmDelete) {
                        // Eliminar todos los hijos de productContainer
                        while (productContainer.firstChild) {
                            productContainer.removeChild(productContainer.firstChild);
                        }

                        // Obtener el ID del producto que deseas eliminar
                        const productId = product.id; // Asegúrate de que esté configurado correctamente en tu HTML

                        // Realizar una solicitud AJAX para eliminar el producto de la base de datos
                        try {
                            const deleteResponse = await fetch(`http://localhost:3000/products/${productId}`, {
                                method: "DELETE",
                            });

                            if (deleteResponse.ok) {
                                console.log("Producto eliminado de la base de datos.");
                            } else {
                                console.error("Error al eliminar el producto de la base de datos.");
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });

                // Agrega un evento de clic para manejar la edición del producto
                editLink.addEventListener("click", (event) => {
                    // Previene la navegación a la página edit-product.html por defecto
                    event.preventDefault();
                    // Obtiene el ID del producto del atributo "data-id" del elemento "a"
                    const productId = product.id; // Asegúrate de que esté configurado correctamente en tu HTML
                    // Redirige a la página edit-product.html con el ID como parámetro de consulta
                    window.location.href = `./edit-product.html?id=${productId}`;
                });
            });
        } else {
            console.error("Error al cargar el archivo JSON");
        }
    };

    xhr.send();
});
