// Esperar a que el navegador cargue todo el documento
document.addEventListener('DOMContentLoaded', () => {
    // Obtener los productos guardados en localStorage o iniciar vacío
    let carrito = JSON.parse(localStorage.getItem('carritoFarmaOnline')) || [];

    // Referencias a los elementos del HTML
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total-precio');
    const botonVaciar = document.getElementById('vaciar-carrito');
    const botonComprar = document.getElementById('procesar-compra');

    // Función para dibujar los productos en la pantalla
    function mostrarCarrito() {
        if (!contenedorCarrito) return;

        contenedorCarrito.innerHTML = '';

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
            if (totalElemento) totalElemento.textContent = '$0.00';
            return;
        }

        let total = 0;

        carrito.forEach((producto, index) => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const fila = document.createElement('div');
            fila.classList.add('item-carrito');
            fila.innerHTML = `
                <img src="${producto.imagen || 'IMAGENES/default.png'}" alt="${producto.nombre}" class="img-carrito">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio.toLocaleString()}</p>
                    <p>Subtotal: $${subtotal.toLocaleString()}</p>
                </div>
                <div class="controles-cantidad">
                    <button class="btn-restar" data-index="${index}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-sumar" data-index="${index}">+</button>
                </div>
                <button class="btn-eliminar" data-index="${index}">&times;</button>
            `;

            contenedorCarrito.appendChild(fila);
        });

        if (totalElemento) {
            totalElemento.textContent = `$${total.toLocaleString()}`;
        }

        guardarCarrito();
    }

    // Guardar cambios en la memoria local del navegador
    function guardarCarrito() {
        localStorage.setItem('carritoFarmaOnline', JSON.stringify(carrito));
    }

    // Escuchar clics en los botones de +, - y eliminar
    if (contenedorCarrito) {
        contenedorCarrito.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');

            if (e.target.classList.contains('btn-sumar')) {
                carrito[index].cantidad++;
                mostrarCarrito();
            } else if (e.target.classList.contains('btn-restar')) {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                } else {
                    carrito.splice(index, 1);
                }
                mostrarCarrito();
            } else if (e.target.classList.contains('btn-eliminar')) {
                carrito.splice(index, 1);
                mostrarCarrito();
            }
        });
    }

    // Botón para vaciar el carrito
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            carrito = [];
            mostrarCarrito();
        });
    }

    // Botón para realizar la compra
    if (botonComprar) {
        botonComprar.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            alert('¡Gracias por tu compra en FarmaOnline!');
            carrito = [];
            mostrarCarrito();
        });
    }

    mostrarCarrito();
});