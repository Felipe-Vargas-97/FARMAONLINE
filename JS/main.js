document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('button, .btn, .btn-agregar, .btn-comprar');

    botones.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const tarjeta = evento.target.closest('div, article, section');
            if (!tarjeta) return;

            const titulo = tarjeta.querySelector('h1, h2, h3, h4, .nombre')?.textContent.trim() || 'Producto FarmaOnline';
            const textoPrecio = tarjeta.querySelector('.precio, span, p')?.textContent || '0';
            const precio = parseInt(textoPrecio.replace(/[^0-9]/g, '')) || 5000;
            const imagen = tarjeta.querySelector('img')?.src || 'IMAGENES/default.png';

            const productoNuevo = {
                nombre: titulo,
                precio: precio,
                imagen: imagen,
                cantidad: 1
            };

            let carrito = JSON.parse(localStorage.getItem('carritoFarmaOnline')) || [];
            const existeIndex = carrito.findIndex(p => p.nombre === productoNuevo.nombre);

            if (existeIndex !== -1) {
                carrito[existeIndex].cantidad++;
            } else {
                carrito.push(productoNuevo);
            }

            // Guarda en la memoria en segundo plano de forma silenciosa
            localStorage.setItem('carritoFarmaOnline', JSON.stringify(carrito));
        });
    });
});