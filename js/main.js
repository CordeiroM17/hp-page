/* Objetos a cargar */
const productos = [
    {id:1, tipo:"laptop", imagen:"images/shop/laptop_01.png", nombre:"HP ENVY x360", cantidad:16, descripcion:"Windows 11 Home - 8th generation Intel® Core™ processor - Easily converts into stand, tent, or tablet mode - Full-size backlit keyboard with numeric keypad", precio:599.99, oferta:839.99},
    {id:2, tipo:"laptop", imagen:"images/shop/laptop_02.png", nombre:"HP ENVY 16", cantidad:3, descripcion:"Windows 11 Home - 12th generation Intel® Core™ processors - 16.1-inch; 16:10 aspect ratio display - Up to 9:45 hours battery life", precio:999.99, oferta:1399.99},
    {id:3, tipo:"laptop", imagen:"images/shop/laptop_03.png", nombre:"HP ENVY 15", cantidad:4, descripcion:"Windows 11 Home - Intel® Core™ processors - 15-inch display with optional touchscreen - Up to 2 TB of storage", precio:729.99, oferta:949.99},
    {id:4, tipo:"laptop", imagen:"images/shop/laptop_04.png", nombre:"OMEN 16", cantidad:22, descripcion:"Ultimate Gaming performance", precio:849.99, oferta:1209.99},
    {id:5, tipo:"printer", imagen:"images/shop/impresora_01.png", nombre:"HP DeskJet", cantidad:6, descripcion:"Reliable, easy-to-use printers for everyday printing", precio:49.99, oferta:84.99},
    {id:6, tipo:"printer", imagen:"images/shop/impresora_02.png", nombre:"HP ENVY", cantidad:10, descripcion:"Versatile all-in-ones with the lastest photo and mobile printing innovation", precio:119.99, oferta:169.99},
    {id:7, tipo:"printer", imagen:"images/shop/impresora_03.png", nombre:"HP OficeJet Pro", cantidad:2, descripcion:"Full-featured printers for a productive office", precio:169.99, oferta:221.99},
    {id:8, tipo:"printer", imagen:"images/shop/impresora_04.png", nombre:"HP Smatr Tank", cantidad:4, descripcion:"High-capacity ink tank printers designed for the whole family", precio:169.99, oferta:221.99},
    {id:9, tipo:"software", imagen:"images/shop/software_01.png", nombre:"Adobe Photoshop Elements 2023", cantidad:2, descripcion:"5 User", precio:149.99, oferta:199.99},
    {id:10, tipo:"software", imagen:"images/shop/software_02.png", nombre:"Laplink PCmover v.11.0 Professional", cantidad:4, descripcion:"5 User", precio:230.99, oferta:300.99},
    {id:11, tipo:"software", imagen:"images/shop/software_03.png", nombre:"Magix SOUND FORGE Pro v.12.0", cantidad:5, descripcion:"Magix SOUND FORGE Pro v.12.0 - Mini Box Packing - Audio Editing", precio:399.99, oferta:499.99},
    {id:12, tipo:"software", imagen:"images/shop/software_04.png", nombre:"HP 1 Year Wolf Pro Security License", cantidad:10, descripcion:"Deployment made easy - Effortlessly manage and monitor Pc Security", precio:36.99, oferta:59.99},
];

function addCart(prodId) {
    let item = productos.find((prod) => prod.id === prodId)
    cart.push(item)
    mostrarCarrito(item)
    cart_cont.innerText = cart.length

}

function mostrarCarrito(prod) {

    let cart_section = document.querySelector("tbody")
    let fila = document.createElement("tr")
    fila.innerHTML = `
                    <td><img src="${prod.imagen}"></td>
                    <td>${prod.nombre}</td>
                    <td>1</td>
                    <td>${prod.precio}</td>
                    <td><button class="btn-eliminar" onclick=eliminarDelCart(${prod.id})><i class="bi bi-trash3"></i></button></td>
                    `;
    cart_section.appendChild(fila);

    let btn_eliminar = document.querySelectorAll(".btn-eliminar")

    for(let boton of btn_eliminar) {
        boton.addEventListener("click", eliminarProducto)
    }
    
    this.guardarProductosLocalStorage(prod)
}

function eliminarDelCart(prodId) {
    
    let item = cart.find((prod) => prod.id === prodId)
    let indice = cart.indexOf(item)
    cart.splice(indice, 1)
    cart_cont.innerText = cart.length
    this.eliminarLocalStorage(indice)
}

function eliminarProducto(e){
    let abuelo = e.target.parentNode.parentNode.parentNode;
    abuelo.remove()
}

// Local Storage
function guardarProductosLocalStorage(producto) {
    let prod;
    prod = this.obtenerProductosLocalStorage();
    prod.push(producto);
    localStorage.setItem("prod", JSON.stringify(prod))
}

function obtenerProductosLocalStorage() {
    let prodLS;
     if(localStorage.getItem("prod") === null) {
        prodLS = []
     } else {
        prodLS = JSON.parse(localStorage.getItem("prod"));
     }
     return prodLS
}

function eliminarLocalStorage(prodId) {

    let prodLS;
    prodLS = this.obtenerProductosLocalStorage()
    prodLS.forEach(function(prodLS, index){
        if(prodLS.id === prodId) {
            prodLS.splice(index, 1)
        }
    });

    localStorage.setItem("prod", JSON.stringify(prodLS))
}

function leerLocalStorageCart() {
    let prodLS;
    prodLS = this.obtenerProductosLocalStorage()
    prodLS.forEach(function(prod){
        let cart_section = document.querySelector("tbody")
        let fila = document.createElement("tr")
        fila.innerHTML = `
                        <td><img src="${prod.imagen}"></td>
                        <td>${prod.nombre}</td>
                        <td>1</td>
                        <td>${prod.precio}</td>
                        <td><button class="btn-eliminar" onclick=eliminarDelCart(${prod.id})><i class="bi bi-trash3"></i></button></td>
                        `;
        cart_section.appendChild(fila);
    });
}

/* Cargar productos en las cards */

let cardSection = document.querySelector(".card-section")
let cart_cont = document.getElementById("cart_cont")
let cart = []

document.addEventListener("DOMContentLoaded", leerLocalStorageCart())

productos.forEach((productos) => {
    let div = document.createElement('div')
    div.classList.add("card-container",  productos.tipo)
    div.innerHTML = `
                    <div class="card">
                        <img src="${productos.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3 class="card-title">${productos.nombre}</h3>
                            <h4 class="card-text">${productos.cantidad} PRODUCTS</h4>
                            <h5>${productos.descripcion}</h5>
                        </div>
                        <div class="card-price">
                            <span>Starting at <del>$${productos.oferta}</del></span>
                            <h4>$${productos.precio}</h4>
                        </div>
                        <div class="card-btn">
                            <button href="#" id="id_${productos.id}" class="btn btn_cart btn-primary">ADD CART</button>
                        </div>
                    </div>
                    `;
    cardSection.appendChild(div)

    let btn = document.getElementById(`id_${productos.id}`)

    btn.addEventListener("click", () => {
        addCart(productos.id)
    })

}) 

/* Dark Mode */
/* Agarra el boton de Dark Mode y escucha el evento click
Despues revisa si en este boton esta la clasi "active-dark-mode"
Si esta agrega el icono del sol y lo mueve hacia abajo
Lo mismo pero de manera contraria para podes volver al modo claro 
*/

let toggle = document.querySelector(".toggle-switch")

toggle.onclick = function(){
    let mode = document.getElementById("toggle_dark")
    let dark = document.querySelector("body")
    toggle.classList.toggle("active-dark-mode")
    if (toggle.classList.contains("active-dark-mode")) {
        mode.classList.remove("bi-moon-fill")
        mode.classList.add("bi-brightness-high-fill")
        dark.classList.add("dark")
    } else {
        mode.classList.remove("bi-brightness-high-fill")
        mode.classList.add("bi-moon-fill")
        dark.classList.remove("dark")
    }
}