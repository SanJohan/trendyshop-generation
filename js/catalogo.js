let carrito = JSON.parse(localStorage.getItem("carrito") ?? "[]");

function renderCart() {
    const countElement = document.getElementById('cart-count');
    const totalItems = carrito.length;
    if (countElement) countElement.innerText = totalItems;
}

// Inicializar el carrito al cargar
renderCart();

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCart();
}

const botones = document.querySelectorAll(".product-card__btn");

botones.forEach(boton => {
    boton.addEventListener("click", () => {

        const card = boton.closest(".product-card");

        const nombre = card.querySelector(".product-card__title").textContent.trim();

        const precio = Number(
            card.querySelector(".product-card__price")
                .textContent
                .replace(/\D/g, "")
        );

        const imagen = card.querySelector("img").src;

        const id = nombre;

        const existe = carrito.find(p => p.id === id);

        if (existe) {
            existe.cantidad++;
            alert(`Se agrego nuevamente: ${nombre}`);
        } else {
            carrito.push({
                id,
                nombre,
                precio,
                imagen,
                cantidad: 1
            });
            alert(`Producto agregado: ${nombre}`);
        }

        guardarCarrito();

        console.log("Carrito actualizado:", carrito);
    });
});

const btnFiltro = document.getElementById("btn-filtro");
const checkboxes = document.querySelectorAll(".filters__option input");
const productos = document.querySelectorAll(".product-card");

btnFiltro.addEventListener("click", () => {

    try{
        const checkboxes = document.querySelectorAll(".filters__option input");
        const productos = document.querySelectorAll(".product-card");

        let categoriasSeleccionadas = [];

        checkboxes.forEach(ch => {
            if (ch.checked && ch.parentElement.textContent.trim() !== "Todas") {
                categoriasSeleccionadas.push(ch.parentElement.textContent.trim());
            }
        });

        productos.forEach(card => {

            const categoria = card
                .querySelector(".product-card__category")
                .textContent.trim();

            if (
                categoriasSeleccionadas.length === 0 ||
                categoriasSeleccionadas.includes(categoria)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });
    } catch(e){
        console.log(e)
    }
});