const productos = [
  { id: 1, nombre: "Ajuar Niño", precio: 15, imagen: "imagenes/Ajuar_Nino.jpg" },
  { id: 2, nombre: "Ajuar Niña", precio: 18, imagen: "imagenes/Ajuar_Nina.jpg" },
  { id: 3, nombre: "3 Busos", precio: 20, imagen: "imagenes/busos.jpg" },
  { id: 4, nombre: "Saco de domir", precio: 15, imagen: "imagenes/Saco_de_dormir.jpg" },
];

// Detectar si estamos en la página de productos
const contenedor = document.getElementById("lista-productos");

if (contenedor) {
  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: S/. ${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// ---- CARRITO ----
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`Agregaste "${producto.nombre}" al carrito 🛒`);
}
// ---- MOSTRAR CARRITO ----
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");

if (listaCarrito) {
  mostrarCarrito();
}

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>Tu carrito está vacío 🍼</p>";
    totalElemento.textContent = "";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <span>${item.nombre}</span>
      <span>S/. ${item.precio}</span>
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    listaCarrito.appendChild(div);
    total += item.precio;
  });

  totalElemento.textContent = `Total: S/. ${total}`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
}
// ---- FORMULARIO DE PAGO ----
const formPago = document.getElementById("form-pago");
const mensajeExito = document.getElementById("mensaje-exito");

if (formPago) {
  formPago.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que recargue la página

    const nombre = document.getElementById("nombre").value;
    const tarjeta = document.getElementById("tarjeta").value;
    const direccion = document.getElementById("direccion").value;

    if (nombre && tarjeta && direccion) {
      mensajeExito.textContent = `¡Gracias por tu compra, ${nombre}! 💕 Tu pedido será enviado a ${direccion}.`;
      localStorage.removeItem("carrito"); // Limpia el carrito
      formPago.reset();
    } else {
      mensajeExito.textContent = "Por favor, completa todos los campos.";
      mensajeExito.style.color = "red";
    }
  });
}
