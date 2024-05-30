let productos = [

    {
        "id": "proteina-01",
        "titulo": "Whey Protein Star Nutrition Varios Sabores X 2lbs",
        "imagen": "./img/Proteinas/01.jpg",
        "categoria":  "proteina",
        "precio": 23700
    },
    {
        "id": "proteina-02",
        "titulo": "Whey Protein True Made Ena Varios Sabores X 1 Lbs",
        "imagen": "./img/Proteinas/02.jpg",
        "categoria":  "proteina",
        "precio": 13200
    },
    {
        "id": "proteina-03",
        "titulo": "Whey Protein 7900 Gentech Varios Sabores X 500gs",
        "imagen": "./img/Proteinas/03.jpg",
        "categoria":  "proteina",
        "precio": 11500
    },
    {
        "id": "proteina-04",
        "titulo": "Proteína Whey Protein Body Advance Varios Sabores 910g",
        "imagen": "./img/Proteinas/04.jpg",
        "categoria":  "proteina",
        "precio": 14900
    },
    {
        "id": "proteina-05",
        "titulo": "Prolac Whey Protein Pulver Varios Sabores X 1kg",
        "imagen": "./img/Proteinas/05.jpg",
        "categoria":  "proteina",
        "precio": 24800
    },
    {
        "id": "creatina-01",
        "titulo": "Creatina Monohidrato EEuu Star Nutrition X 300g",
        "imagen": "./img/Creatinas/01.jpg",
        "categoria": "creatina",
        "precio": 25500
    },
    {
        "id": "creatina-02",
        "titulo": "Creatina Micronizada Ena Varios Sabores X 300g",
        "imagen": "./img/Creatinas/02.jpg",
        "categoria": "creatina",
        "precio": 26600
    },
    {
        "id": "creatina-03",
        "titulo": "Creatina Monohidrato Premium Mervick Lab X 300g",
        "imagen": "./img/Creatinas/03.jpg",
        "categoria": "creatina",
        "precio": 21500
    },
    {
        "id": "creatina-04",
        "titulo": "Creatina Monohidrato Gold Nutrition X 300gr",
        "imagen": "./img/Creatinas/04.jpg",
        "categoria": "creatina",
        "precio": 22500
    },
    {
        "id": "creatina-05",
        "titulo": "Creatina Micronizada Htn X 250g",
        "imagen": "./img/Creatinas/05.jpg",
        "categoria": "creatina",
        "precio": 27500
    },
    
    {
        "id": "multivitaminico-01",
        "titulo": "Multivitamin Ena Sport X 60 Tabs",
        "imagen": "./img/Multivitaminico/01.jpg",
        "categoria": "multivitaminico",
        "precio": 7900
    },
    {
        "id": "multivitaminico-02",
        "titulo": "V-Mineral complex 60 comp Body Advance",
        "imagen": "./img/Multivitaminico/02.jpg",
        "categoria": "multivitaminico",
        "precio": 5850
    },
    {
        "id": "multivitaminico-03",
        "titulo": "Enacción multivitamínico 30 comp ENA",
        "imagen": "./img/Multivitaminico/03.jpg",
        "categoria": "multivitaminico",
        "precio": 5870
    },
    {
        "id": "multivitaminico-04",
        "titulo": "Vitamin pro 60 caps HTN",
        "imagen": "./img/Multivitaminico/04.jpg",
        "categoria": "multivitaminico",
        "precio": 10080
    },
    {
        "id": "multivitaminico-05",
        "titulo": "Multivitamin 60 tabs Gentech",
        "imagen": "./img/Multivitaminico/05.jpg",
        "categoria": "multivitaminico",
        "precio": 4850
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            console.log(productoCategoria)
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100); 
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500); 
    }, 3000);
}

function agregarAlCarrito(e) {

    showNotification("Producto agregado");

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}