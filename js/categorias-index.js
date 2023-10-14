document.addEventListener("DOMContentLoaded", function () {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://verceldbjson-cr80m2v8l-luisdna1196.vercel.app/products/", true);
    
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
    
                // Filtrar productos por categoría
                const playeras = data.filter(product => product.category === "Playeras");
                const juegos = data.filter(product => product.category === "Juegos");
                const consolas = data.filter(product => product.category === "Consolas");
                const diversos = data.filter(product => product.category === "Diversos");
                const tazas = data.filter(product => product.category === "Tazas");
    
                // Función para crear una carta de producto
                function createProductCard(product) {
                    const productLink = document.createElement("a");
                    productLink.classList.add("product"); // Agregar clase "product"
                    productLink.href = `detail-product.html?id=${product.id}`;
                    productLink.target = "_blank"
                    
                    const productSubContainer = document.createElement("div");
                    productSubContainer.classList.add("category-text-container");

                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
    
                    const productImage = document.createElement("img");
                    productImage.classList.add("producto-img")
                    productImage.src = product.url;
                    productImage.alt = product.name;
    
                    const productName = document.createElement("h3");
                    productName.classList.add("category-product-name")
                    productName.textContent = product.name;
    
                    const productPrice = document.createElement("p");
                    productPrice.classList.add("category-price")
                    productPrice.textContent = `$${product.price}`;
    
                    const productButton = document.createElement("button");
                    productButton.classList.add("category-detail-link")
                    productButton.innerHTML = 'Ver Detalles <i class="fa-solid fa-arrow-right-to-bracket"></i>';                    
                    productButton.addEventListener("click", () => {
                        // Redirigir a la página de detalles del producto (detail-product.html)
                        
                    });
                    productLink.appendChild(productCard);
                         productCard.appendChild(productImage);
                         productCard.appendChild(productSubContainer);
                    
                                 productSubContainer.appendChild(productName);
                                 productSubContainer.appendChild(productPrice);
                                 productSubContainer.appendChild(productButton);

                    
                

                    return productLink;
                }
    
                // Mostrar productos de cada categoría en el carrusel
                const playerasCarousel = document.getElementById("playeras-carousel");
                const juegosCarousel = document.getElementById("juegos-carousel");
                const consolasCarousel = document.getElementById("consolas-carousel");
                const diversosCarousel = document.getElementById("diversos-carousel");
                const tazasCarousel = document.getElementById("tazas-carousel");
    
                playeras.forEach(product => {
                    const card = createProductCard(product);
                    playerasCarousel.appendChild(card);
                });
    
                juegos.forEach(product => {
                    const card = createProductCard(product);
                    juegosCarousel.appendChild(card);
                });
    
                consolas.forEach(product => {
                    const card = createProductCard(product);
                    consolasCarousel.appendChild(card);
                });
    
                diversos.forEach(product => {
                    const card = createProductCard(product);
                    diversosCarousel.appendChild(card);
                });

                tazas.forEach(product => {
                    const card = createProductCard(product);
                    tazasCarousel.appendChild(card);
                });
            } else {
                console.error("Error al cargar el archivo JSON");
            }
        };
    
        xhr.send();
    });
    