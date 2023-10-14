document.addEventListener("DOMContentLoaded", function () {
    // Obtener la ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    // Obtener referencias a los elementos del formulario
    const form = document.querySelector('.add-product__form');
    const inputName = document.querySelector('#product-name');
    const inputCategory = document.querySelector('#category');
    const inputImg = document.querySelector('#img');
    const inputPrice = document.querySelector('#price');
    const inputDescription = document.querySelector('#description');

    // Función para cargar los datos del producto
    const loadProductData = async () => {
        try {
            // Realizar una solicitud AJAX para obtener los datos del producto desde tu servidor
            const response = await fetch(`https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            const product = await response.json();

            // Llenar los campos del formulario con los datos del producto
            inputName.value = product.name;
            inputCategory.value = product.category;
            inputImg.value = product.url;
            inputPrice.value = product.price;
            inputDescription.value = product.description;
        } catch (error) {
            console.error(error);
        }
    };

    // Función para enviar la solicitud de edición del producto
    const editProduct = async (e) => {
        e.preventDefault();

        // Obtener los valores actualizados de los campos del formulario
        const name = inputName.value;
        const category = inputCategory.value;
        const url = inputImg.value;
        const price = inputPrice.value;
        const description = inputDescription.value;

        // Crear un objeto JSON con los datos actualizados
        const updatedProduct = {
            name,
            category,
            url,
            price,
            description,
        };

        try {
            // Realizar una solicitud AJAX para actualizar el producto en tu servidor
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT', // Usar el método HTTP PUT para actualizar
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct), // Convertir el objeto a JSON
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            alert(`Producto ${name} editado con éxito!`)
            // Redirigir a la página de confirmación después de editar el producto
            setTimeout(() => {
                window.location.href = '../admin.html';
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
    // Cargar los datos del producto al cargar la página
    loadProductData();

    // Agregar un evento de escucha para enviar la solicitud de edición al enviar el formulario
    form.addEventListener('submit', editProduct);
});
