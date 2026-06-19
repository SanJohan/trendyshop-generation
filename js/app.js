function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}

let cart = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(cart);

function renderCart() {
    const countElement = document.getElementById('cart-count');
    const totalItems = cart.length;
    if (countElement) countElement.innerText = totalItems;
}

// Inicializar el carrito al cargar
renderCart();