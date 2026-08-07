// Carga el header y el footer en cada página, para no repetir el código

async function cargarPartial(selector, archivo) {
  const contenedor = document.querySelector(selector);
  if (!contenedor) return;

  try {
    const respuesta = await fetch(archivo);
    const html = await respuesta.text();
    contenedor.innerHTML = html;
  } catch (error) {
    console.error(`No se pudo cargar ${archivo}`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarPartial("#header-placeholder", "partials/header.html").then(() => {
  if (typeof marcarPaginaActiva === "function") marcarPaginaActiva();
  if (typeof activarMenuMovil === "function") activarMenuMovil();
});
  cargarPartial("#footer-placeholder", "partials/footer.html");
});
