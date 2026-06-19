const formulario = document.getElementById("contactForm");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const mensajeInput = document.getElementById("mensaje");
const newsletterInput = document.querySelector(".newsletter__form input");
const newsletterButton = document.querySelector(".newsletter__form button");

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

const contacto = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        mensaje: document.getElementById('mensaje').value
    };

    localStorage.setItem('contacto', JSON.stringify(contacto));
    alert("Mensaje enviado correctamente");
    formulario.reset();

newsletterButton.addEventListener("click", function(){
    const correoNewsletter = newsletterInput.value.trim();

    if(correoNewsletter === ""){
        alert("Tienes que ingresar un correo");
        return;
    }

    if(!correoNewsletter.includes("@")){
        alert("Ingresa un correo válido");
        return;
    }

    const suscriptor = {correo: correoNewsletter};
    const suscriptores = JSON.parse(localStorage.getItem("suscriptores")) || [];

    suscriptores.push(suscriptor);
    localStorage.setItem("suscriptores", JSON.stringify(suscriptores));
    alert("Te has suscrito correctamente :)");
    newsletterInput.value = "";
});
})