let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
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

    const seleccionados = [...checkboxes]
        .filter(ch => ch.checked)
        .map(ch => ch.parentElement.textContent.trim());

    productos.forEach(card => {

        const categoria = card
            .querySelector(".product-card__category")
            .textContent.trim();

        if (
            seleccionados.includes("Todas") ||
            seleccionados.includes(categoria)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
});