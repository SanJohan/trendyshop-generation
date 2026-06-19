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
    // Opcional: abrir el carrito al agregar (si prefieres, quita esta línea)
    document.getElementById('cartSidebar').classList.add('open');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    const itemsContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    const countElement = document.getElementById('cart-count');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countElement) countElement.innerText = totalItems;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p class="text-center text-muted py-4">Tu carrito está vacío</p>';
        totalElement.innerText = '$0.00';
        return;
    }

    let html = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalPrice += subtotal;

        html += `
            <div class="border-bottom mb-3 pb-2">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <button class="btn btn-sm text-danger p-0" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    itemsContainer.innerHTML = html;
    totalElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Inicializar el carrito al cargar
renderCart();