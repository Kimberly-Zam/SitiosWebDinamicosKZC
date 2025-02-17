//------------------------------ carrusel ----------------------------------------
const imagenesCarrusel = ["../img/portada1.jpg", "../img/portada2.jpg", "../img/portada3.jpg"];

const botonIzquierdo = document.querySelector('.carruselBtn.izq');
const botonDerecho = document.querySelector('.carruselBtn.der');
const imagenCarrusel = document.querySelector('.carruselImg img');

let indiceActual = 0;

function actualizarImagen() {
    imagenCarrusel.src = imagenesCarrusel[indiceActual];
}

botonIzquierdo.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + imagenesCarrusel.length) % imagenesCarrusel.length;
    actualizarImagen();
});

botonDerecho.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % imagenesCarrusel.length;
    actualizarImagen();
});

//------------------------------ tarjetas de productos --------------------------------------
const imagenesProductos = {
    producto1: ["../img/producto1.jpg", "../img/producto1-chamarra.jpg"],
    producto2: ["../img/producto2.jpg", "../img/producto2-blusa verde.jpg"],
    producto3: ["../img/producto3.jpg", "../img/producto3-vestido.jpg"],
    producto4: ["../img/producto4.jpg", "../img/producto4-polera.jpg"],
    producto5: ["../img/producto5.jpg", "../img/producto5-pantalon.jpg"],
};

const productos = document.querySelectorAll(".producto");

productos.forEach((producto) => {
    const idProducto = producto.dataset.id;

    const imagenes = imagenesProductos[idProducto];

    const imagenElemento = producto.querySelector(".productoImg");
    const botonIzquierdo = producto.querySelector(".productoBtn.izq");
    const botonDerecho = producto.querySelector(".productoBtn.der");

    let indiceActual = 0;

    const actualizarImagen = () => {
        imagenElemento.src = imagenes[indiceActual];
    };

    botonIzquierdo.addEventListener("click", () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        actualizarImagen();
    });

    botonDerecho.addEventListener("click", () => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        actualizarImagen();
    });
});


document.querySelectorAll('.producto').forEach(div => {
    div.addEventListener('click', (event) => {
        if (event.target.closest('.productoBtn')|| event.target.closest('.carritoBtn')) {
            return;
        }

        const url = div.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});

//------------------------------ Modal del carrito --------------------------------------
const carritoBtn = document.getElementById("carritoBtn");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const modalCarrito = document.getElementById("modalCarrito");

productos.forEach((producto) => {
    const botonCarrito = producto.querySelector(".carritoBtn");
    botonCarrito.addEventListener("click", () => {
        modalCarrito.classList.add("mostrar");
    });
});

btnSi.addEventListener("click", () => {
    window.location.href = "carrito";
});

btnNo.addEventListener("click", () => {
    modalCarrito.classList.remove("mostrar");
});

modalCarrito.addEventListener("click", (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.classList.remove("mostrar");
    }
});