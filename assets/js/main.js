// Aquí irá la lógica de interacción del sitio (menú móvil, etc.)
// Carrusel de clientes: duplica el contenido para loop infinito y pausa al pasar el mouse
const clientesSlide = document.querySelector(".clientes-slide");

if (clientesSlide) {
  clientesSlide.innerHTML += clientesSlide.innerHTML; // duplica para loop continuo

  clientesSlide.addEventListener("mouseenter", () => {
    clientesSlide.classList.add("pausado");
  });

  clientesSlide.addEventListener("mouseleave", () => {
    clientesSlide.classList.remove("pausado");
  });
}