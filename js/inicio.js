/* ==============================
   MENÚ MÓVIL
   ============================== */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}
