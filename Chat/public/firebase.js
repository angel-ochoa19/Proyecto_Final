// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import {getDatabase, ref, onValue, update, push,child}
from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkxFknxQg2lXjzNzPIW-KlIdHfcx85dZg",
  authDomain: "fir-9edc0.firebaseapp.com",
  projectId: "fir-9edc0",
  storageBucket: "fir-9edc0.appspot.com",
  messagingSenderId: "583975644340",
  appId: "1:583975644340:web:b710fbe7dfb1f3a4d47be1",
  measurementId: "G-LKRZF32EB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Aca inicia mi programa
var usuarioConectado = document.getElementById('usuarioConectado');
var botonIniciar = document.getElementById('botonIniciar');
var botonCerrar = document.getElementById('botonCerrar');
var textoMensajes = document.getElementById('textoMensajes');
var MensajesChat = document.getElementById('MensajesChat');
var nombreUsuarioConectado = "";

botonIniciar.onclick = async function() {
  // Obtenemos la lógica de autenticación
  var auth = getAuth();
  // Creamos el proveedor, en este caso es Google
  var provider = new GoogleAuthProvider();
  auth.languageCode = "es";
  var response = await signInWithPopup(auth, provider);
  usuarioConectado.innerText = response.user.email;
  botonCerrar.style.display = "block";
  botonIniciar.style.display = "none";
  nombreUsuarioConectado = response.user.email;
  escucharYDibujarMensajes();
};

botonCerrar.onclick = async function() {
  var auth = getAuth();
  await auth.signOut();
  botonCerrar.style.display = "none";
  botonIniciar.style.display = "block";
  usuarioConectado.innerText = "No conectado";
  nombreUsuarioConectado = "";
};

textoMensajes.onkeydown = async function(event) {
  if (event.key == "Enter") {
    if (nombreUsuarioConectado == "") {
      alert("El usuario debe iniciar sesión");
      return;
    }
    var db = getDatabase();
    var referenciaMensajes = ref(db, "Mensajes");
    var nuevaLlave = push(child(ref(db), "Mensajes")).key;
    var nuevosDatos = {
      [nuevaLlave]: {
        usuario: nombreUsuarioConectado,
        Mensajes: textoMensajes.value,
        fecha: new Date().toLocaleDateString()
      }
    };
    textoMensajes.value = "";
    update(referenciaMensajes, nuevosDatos);
  }
};

function escucharYDibujarMensajes() {
  var db = getDatabase();
  var referenciaMensajes = ref(db, "Mensajes");
  onValue(referenciaMensajes, function(datos) {
    var valoresObtenidos = datos.val();
    MensajesChat.innerHTML = "";
    Object.keys(valoresObtenidos).forEach(Llave => {
      var MensajesDescargados = valoresObtenidos[Llave];
      var Mensajes = "";
      Mensajes = "<div class='nombre-Usuario'>" + MensajesDescargados.usuario + "</div>";
      Mensajes += "<div class='mensajesChat'>" + MensajesDescargados.Mensajes + "</div>";
      Mensajes += "<div>" + MensajesDescargados.fecha + "</div><hr>";
      MensajesChat.innerHTML += Mensajes;
    });
  });
}