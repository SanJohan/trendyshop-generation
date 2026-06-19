let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.querySelector(".productos");
const cantidadProductosText = document.getElementById("cantidad-productos");
const subtotalText = document.getElementById("subtotal");
const impuestosText = document.getElementById("impuestos");
const totalText = document.getElementById("total");
const carritoTextoEncabezado = document.querySelector(".carrito__texto");
const badgeNavbar = document.querySelector(".navbar__badge");
const botonCompra = document.querySelector(".resumen__boton");

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

botonCompra.addEventListener("click", confirmarCompra);

function confirmarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito ya está vacío, agrega productos primero.");
        return; 
    }
    alert("¡Compra exitosa! Gracias por tu compra.");

    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

function actualizarResumen() {
    let totalProductos = 0;
    let subtotal = 0;

    
    
    carrito.forEach(producto => {
        totalProductos += producto.cantidad;
        subtotal += producto.precio * producto.cantidad;
    });

    let impuestos = subtotal * 0.19;
    let total = subtotal + impuestos;


    cantidadProductosText.textContent = "Subtotal (" + totalProductos + " productos)";
    subtotalText.textContent = "$" + subtotal;
    impuestosText.textContent = "$" + impuestos;
    totalText.textContent = "$" + total;
    
    if (carritoTextoEncabezado) {
        carritoTextoEncabezado.textContent = "Tienes " + totalProductos + " productos listos para procesar.";
    }
    if (badgeNavbar) {
        badgeNavbar.textContent = totalProductos;
    }
}

function mostrarCarrito() {

    contenedorProductos.innerHTML = "";

    if (carrito.length === 0) {
        contenedorProductos.innerHTML = `
            <div class="producto">
                <p>Tu carrito está vacío.</p>
            </div>
        `;
        actualizarResumen();
        return;
    }

    carrito.forEach(producto => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.classList.add("producto");

        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto__imagen">
            <div class="producto__info">
                <h3 class="producto__nombre">${producto.nombre}</h3>
                <p class="producto__detalle">Precio unitario: $${producto.precio}</p>
                <div class="producto__acciones">
                    <div class="producto__cantidad">
                        <button class="btn-restar" data-id="${producto.id}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="btn-sumar" data-id="${producto.id}">+</button>
                    </div>
                    <a href="#" class="producto__eliminar" data-id="${producto.id}">
                        <i class="bi bi-trash"></i> Eliminar
                    </a>
                </div>
            </div>
            <div class="producto__precio">
                $${producto.precio * producto.cantidad}
            </div>
        `;

        contenedorProductos.appendChild(tarjetaProducto);
    });

    asignarEventosBotones();
    actualizarResumen();
}

function asignarEventosBotones() {
    
    const botonesSumar = document.querySelectorAll(".btn-sumar");
    botonesSumar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idBuscar = boton.getAttribute("data-id");
            const producto = carrito.find(p => p.id === idBuscar);
            
            if (producto) {
                producto.cantidad++;
                guardarCarrito();
                mostrarCarrito(); 
            }
        });
    });

    const botonRestar = document.querySelectorAll(".btn-restar");
    botonRestar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idBuscar = boton.getAttribute("data-id");
            const producto = carrito.find(p => p.id === idBuscar);
            
            if (producto && producto.cantidad > 1) {
                producto.cantidad--;
                guardarCarrito();
                mostrarCarrito();
            }
        });
    });

    const botonesEliminar = document.querySelectorAll(".producto__eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault(); 
            
            const idBuscar = boton.getAttribute("data-id");
            
            carrito = carrito.filter(p => p.id !== idBuscar);
            
            guardarCarrito();
            mostrarCarrito();
        });
    });
}


mostrarCarrito();