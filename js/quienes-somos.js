function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    setTimeout(() => menu.classList.remove("translate-x-full"), 10);
  } else {
    menu.classList.add("translate-x-full");
    setTimeout(() => menu.classList.add("hidden"), 300);
  }
}

// Simple Reveal On Scroll
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// Initial check
reveal();
