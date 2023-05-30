let miBoton = document.getElementById("elBoton");
let miParrafo = document.getElementById("elParrafo");

// dblclick
// mouseover
// keydown
// mouseout

miParrafo.addEventListener("mouseover", () => {

    miParrafo.classList.toggle("parrafo-azul");

})

miParrafo.addEventListener("dblclick", () => {

    miParrafo.classList.toggle("parrafo-rojo");

})