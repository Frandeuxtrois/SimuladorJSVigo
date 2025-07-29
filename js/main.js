document.addEventListener('DOMContentLoaded', () => {
    gestionarSesionUsuario();
    cargarCarritoDesdeStorage();
    renderizarCarrito();
});

let carrito = [];

const catalogoDiv = document.getElementById('catalogo-autos');
const carritoModal = document.getElementById('carrito-modal');
const carritoItemsContainer = document.getElementById('carrito-items-container');
const cartCounter = document.getElementById('cart-counter');
const carritoTotalPrecio = document.getElementById('carrito-total-precio');
const mensajeFinalDiv = document.getElementById('mensaje-final');
const btnVerCarrito = document.getElementById('ver-carrito');
const btnCerrarModal = document.getElementById('cerrar-modal');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');
const btnFinalizarCompra = document.getElementById('finalizar-compra');

const nombreModal = document.getElementById('nombre-modal');
const nombreInput = document.getElementById('nombre-input');
const btnGuardarNombre = document.getElementById('guardar-nombre');
const mensajeBienvenida = document.getElementById('mensaje-bienvenida');
const errorNombreDiv = document.getElementById('error-nombre');

function gestionarSesionUsuario() {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    if (nombreGuardado) {
        mostrarBienvenida(nombreGuardado);
    } else {
        nombreModal.classList.add('activo');
    }
}

function mostrarBienvenida(nombre) {
    mensajeBienvenida.innerHTML = `
        <span>Hola, ${nombre}</span>
        <button id="cambiar-usuario" class="btn-cambiar-usuario">Cambiar</button>
    `;
    document.getElementById('cambiar-usuario').addEventListener('click', () => {
        localStorage.removeItem('nombreUsuario');
        location.reload();
    });
}

btnGuardarNombre.addEventListener('click', () => {
    const nombreIngresado = nombreInput.value.trim();
    if (nombreIngresado) {
        localStorage.setItem('nombreUsuario', nombreIngresado);
        mostrarBienvenida(nombreIngresado);
        nombreModal.classList.remove('activo');
        errorNombreDiv.textContent = '';
    } else {
        errorNombreDiv.textContent = 'Por favor, ingresa un nombre válido.';
    }
});

catalogoDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-agregar')) {
        const boton = event.target;
        const auto = {
            id: boton.dataset.id,
            modelo: boton.dataset.modelo,
            precio: parseInt(boton.dataset.precio)
        };
        agregarAlCarrito(auto);
    }
});

function agregarAlCarrito(auto) {
    carrito.push(auto);
    renderizarCarrito();
    guardarCarritoEnStorage();
}

function renderizarCarrito() {
    carritoItemsContainer.innerHTML = '';
    mensajeFinalDiv.classList.add('mensaje-final-oculto');
    
    if (carrito.length === 0) {
        carritoItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        carrito.forEach((auto, index) => {
            const item = document.createElement('div');
            item.className = 'carrito-item';
            item.innerHTML = `
                <div class="carrito-item-info">
                    <p class="carrito-item-nombre">${auto.modelo}</p>
                    <p>$${auto.precio.toLocaleString()}</p>
                </div>
                <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            carritoItemsContainer.appendChild(item);
        });
    }
    actualizarTotalYContador();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderizarCarrito();
    guardarCarritoEnStorage();
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    guardarCarritoEnStorage();
}

function actualizarTotalYContador() {
    const total = carrito.reduce((acc, auto) => acc + auto.precio, 0);
    carritoTotalPrecio.textContent = `$${total.toLocaleString()}`;
    cartCounter.textContent = carrito.length;
}

function guardarCarritoEnStorage() {
    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carritoDeCompras');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mensajeFinalDiv.innerText = "Agrega un auto para finalizar la compra.";
        mensajeFinalDiv.classList.remove('mensaje-final-oculto');
        return;
    }

    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Cliente';
    mensajeFinalDiv.innerText = `¡Gracias por tu compra, ${nombreUsuario}! La simulación ha finalizado.`;
    mensajeFinalDiv.classList.remove('mensaje-final-oculto');
    
    vaciarCarrito();
}

function abrirModalCarrito() {
    mensajeFinalDiv.classList.add('mensaje-final-oculto');
    renderizarCarrito();
    carritoModal.classList.add('activo');
}

function cerrarModalCarrito() {
    carritoModal.classList.remove('activo');
}

btnVerCarrito.addEventListener('click', abrirModalCarrito);
btnCerrarModal.addEventListener('click', cerrarModalCarrito);
carritoModal.addEventListener('click', (event) => {
    if (event.target === carritoModal) {
        cerrarModalCarrito();
    }
});

btnVaciarCarrito.addEventListener('click', vaciarCarrito);
btnFinalizarCompra.addEventListener('click', finalizarCompra);