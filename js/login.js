const submit = document.getElementById('login');
const loginError = document.querySelector('.login-message-error');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    if(email.value == "test@pixel.com"){
        if(password.value == "pixel123"){
            window.location.href = '../admin.html'
        } else {
            loginError.classList.add('invalid-login')
        }
    } else {
        loginError.classList.add('invalid-login')
    }
})



document.addEventListener("DOMContentLoaded", function () {
    // Realizar una solicitud AJAX para obtener los datos del producto desde db.json
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            // Obtener todos los IDs de los productos
            const productIds = data.products.map(product => product.id);

            // Actualizar el contenido del elemento con el ID "product-ids"
            const productIdsContainer = document.getElementById("product-ids");
            productIdsContainer.textContent = "IDs de Productos: " + productIds.join(", ");

        } else {
            console.error("Error al cargar el archivo JSON");
        }
    };

    xhr.send();
});

