
document.addEventListener("DOMContentLoaded", () => {
    //------------------------------ Tarjetas de productos --------------------------------------
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

        if (botonIzquierdo && botonDerecho) {
            botonIzquierdo.addEventListener("click", () => {
                console.log("click izquierdo"); // Verifica si el evento se dispara
                indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
                actualizarImagen();
            });

            botonDerecho.addEventListener("click", () => {
                console.log("click derecho"); // Verifica si el evento se dispara
                indiceActual = (indiceActual + 1) % imagenes.length;
                actualizarImagen();
            });
        } else {
            console.error("Botones de navegación no encontrados en el producto.");
        }
    });

    // ----------------- Modal img -----------------------
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const cerrarModal = document.getElementById("cerrarModal");

    const imagenProductos = document.querySelectorAll(".productoImg");

    imagenProductos.forEach((imagen) => {
        imagen.addEventListener("click", () => {
            modalImg.src = imagen.src;

            modal.classList.add("show");
        });
    });

    cerrarModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // ----------------- Modal carrito -----------------------
    const carritoBtn = document.getElementById("carritoBtn");
    const btnSi = document.getElementById("btnSi");
    const btnNo = document.getElementById("btnNo");
    const modalCarrito = document.getElementById("modalCarritoP");

    productos.forEach((producto) => {
        const botonCarrito = producto.querySelector(".carritoBtn");
        botonCarrito.addEventListener("click", () => {
            modalCarrito.classList.add("mostrar");
        });
    });

    btnSi.addEventListener("click", () => {
        window.location.href = "/carrito";
    });

    btnNo.addEventListener("click", () => {
        modalCarrito.classList.remove("mostrar");
    });

    modalCarrito.addEventListener("click", (e) => {
        if (e.target === modalCarrito) {
            modalCarrito.classList.remove("mostrar");
        }
    });
});