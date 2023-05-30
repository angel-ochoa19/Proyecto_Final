var pantalla = document.querySelector(".pantalla");
var botones = document.querySelectorAll(".bot");
//esto es para que cada boton haga una funcion//
botones.forEach(boton => {
    boton.addEventListener("click", ()=> { var botonApretado = boton.textContent;
            //esto es para que la calculadora vuelva a cero//
        if (boton.id ==="ac") {
            pantalla.textContent = "0"; return;
        }
            //esto es para que el boton borrar borre de 1 en 1 de atras a delante//
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || "Error") {
                pantalla.textContent = "0";
            } else {
            pantalla.textContent = pantalla.textContent.slice(0,-1); 
            }
            return
        }
            //esto es pos si quieres hacer una operacion que no es permitida escriba error // 
        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error";
            }
            return;
        }

        if (pantalla.textContent === "0" ||pantalla.textContent === "Error") {pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent+= botonApretado;
        }

     
    })
});