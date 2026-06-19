/* ==============================
   MENÚ MÓVIL
   ============================== */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}

/* ==============================
   CARRITO DE COMPRAS
   ============================== */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    // product = {id, name, price}
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    const countElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countElement) countElement.innerText = totalItems;
}

// Inicializar el carrito al cargar
renderCart();