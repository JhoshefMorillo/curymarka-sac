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

// Botón flotante de WhatsApp (visible en todas las páginas)
function agregarBotonWhatsApp() {
  const boton = document.createElement("a");
  boton.href = "https://wa.me/51929125857";
  boton.target = "_blank";
  boton.rel = "noopener noreferrer";
  boton.className = "btn-whatsapp-flotante";
  boton.setAttribute("aria-label", "Contactar por WhatsApp");
  boton.innerHTML = `
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38c1.44.79 3.07 1.21 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.79 14.11c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.34 1.44.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.38-.24.65-.14.26.1 1.66.78 1.94.92.29.14.48.21.55.33.07.13.07.72-.17 1.4z"/>
    </svg>
  `;
  document.body.appendChild(boton);
}

document.addEventListener("DOMContentLoaded", agregarBotonWhatsApp);

// Pestañas de Política de Privacidad / Términos y Condiciones
const legalTabs = document.getElementById("legal-tabs");

if (legalTabs) {
  const botones = legalTabs.querySelectorAll(".legal-tab-btn");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");

      document.querySelectorAll(".legal-contenido").forEach((contenido) => {
        contenido.hidden = true;
      });

      const tabId = `tab-${boton.dataset.tab}`;
      document.getElementById(tabId).hidden = false;
    });
  });
}


// Resalta en el menú la página actual (Inicio, Nosotros, Servicios, Contacto)
function marcarPaginaActiva() {
  const enlacesNav = document.querySelectorAll(".main-nav a");
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";

  enlacesNav.forEach((enlace) => {
    const hrefEnlace = enlace.getAttribute("href");
    if (hrefEnlace === paginaActual) {
      enlace.classList.add("activo");
    }
  });
}

function activarScrollReveal() {
const selectoresReveal = [
  ".porque-card",
  ".servicio-card",
  ".experiencia-card",
  ".historia-item",
  ".dato-card",
  ".proceso-item",
  ".faq-item",
  ".conoce-grid",
  ".quienes-grid",
  ".compromiso-grid",
];

  const elementos = document.querySelectorAll(selectoresReveal.join(", "));
  console.log("Elementos encontrados:", elementos.length); // TEMPORAL
  elementos.forEach((el) => el.classList.add("reveal"));

  function calcularDelay(el) {
    const grid = el.closest(
      ".porque-grid, .servicios-grid, .experiencia-grid, .historia-timeline, .datos-grid, .proceso-grid"
    );
    if (!grid) return 0;
    const index = Array.from(grid.children).indexOf(el);
    return Math.min(index * 0.1, 0.5);
  }

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      console.log(
        "Callback disparado, isIntersecting:",
        entrada.isIntersecting,
        entrada.target,
      ); // TEMPORAL
      if (!entrada.isIntersecting) return;

      const el = entrada.target;
      const delay = calcularDelay(el);

      el.style.transitionDelay = `${delay}s`;
      el.classList.add("reveal--active");

      setTimeout(
        () => {
          el.style.transitionDelay = "";
        },
        (delay + 0.6) * 1000,
      );

      observador.unobserve(el);
    });
  },
  { threshold: 0 },
);

  elementos.forEach((el) => observador.observe(el));
}

document.addEventListener("DOMContentLoaded", activarScrollReveal);

// Envío del formulario de contacto con EmailJS
(function () {
  emailjs.init("O_dVP1A-IBHP8kIVm");
})();

const formContacto = document.getElementById("form-contacto");
const toastContacto = document.getElementById("toast-contacto");
const toastMensajeTexto = document.getElementById("toast-mensaje-texto");

function mostrarToastContacto(mensaje, esError = false) {
  toastMensajeTexto.textContent = mensaje;
  toastContacto.classList.toggle("error", esError);
  toastContacto.classList.add("activo");

  setTimeout(() => {
    toastContacto.classList.remove("activo");
  }, 4000);
}

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();

    const botonEnviar = formContacto.querySelector("button[type='submit']");
    const textoOriginal = botonEnviar.textContent;
    botonEnviar.textContent = "Enviando...";
    botonEnviar.disabled = true;

    emailjs
      .sendForm("service_x1njzkq", "template_b1qv2on", formContacto)
      .then(() => {
        mostrarToastContacto("Correo enviado. Nos pondremos en contacto contigo pronto.");
        formContacto.reset();
      })
      .catch((error) => {
        mostrarToastContacto("Hubo un error al enviar tu mensaje. Intenta nuevamente.", true);
        console.error("Error EmailJS:", error);
      })
      .finally(() => {
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;
      });
  });
}