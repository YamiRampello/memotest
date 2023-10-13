const $cuadros = document.querySelectorAll('.cuadro');
const $finJuego = document.querySelectorAll('.fin-juego');
const cantidadCuadros = 6;

let secuenciaUsuario = [];
let secuenciaUsuarioClase = [];
let puntos = 0;
let intentos = 0;

configurarJuego();
manejarInputUsuario();

function manejarInputUsuario() {
  document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
    $cuadro.onclick = manejarSeleccion;
  });
}

function manejarSeleccion(e) {
  actualizarEstado('Turno del jugador');

  const $cuadro = e.target;
  const $cuadroClase = $cuadro.className;

  mostrarCuadro($cuadro);

  secuenciaUsuario.push($cuadro);
  secuenciaUsuarioClase.push($cuadroClase);

  if (secuenciaUsuarioClase.length === 2) {
    const cuadroElegido_1 = secuenciaUsuarioClase[0];
    const cuadroElegido_2 = secuenciaUsuarioClase[1];

    if (cuadroElegido_1 === cuadroElegido_2) {
      puntos++;
    } else {
      secuenciaUsuario.forEach(function ($cuadro) {
        setTimeout(function () {
          ocultarCuadro($cuadro);
        }, 400);
      });
    }
    secuenciaUsuario = [];
    secuenciaUsuarioClase = [];
    intentos++;
    mostrarPuntos(puntos);
    mostrarIntentos(intentos);
  }

  if (puntos === cantidadCuadros) {
    actualizarEstado('Ganaste!!', true);
    bloquearInputUsuario();
  }
}

function bloquearInputUsuario() {
  document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}

function actualizarEstado(estado, error = false) {
  const $estado = document.querySelector('#estado');
  $estado.textContent = estado;
  if (error) {
    $estado.classList.remove('alert-secondary');
    $estado.classList.add('alert-success');
  } else {
    $estado.classList.remove('alert-success');
    $estado.classList.add('alert-secondary');
  }
}

function mostrarCuadro($cuadro) {
  $cuadro.style.opacity = '1';
}

function ocultarCuadro($cuadro) {
  $cuadro.style.opacity = '0';
}

function configurarJuego() {
  const coloresBase = ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'rosa'];
  const coloresRepetidos = coloresBase.concat(coloresBase);
  configurarCuadros($cuadros, coloresRepetidos);
}

function configurarCuadros($cuadros, colores) {
  const coloresRandom = colores.sort(function () {
    return 0.5 - Math.random();
  });

  coloresRandom.forEach(function (color, i) {
    $cuadros[i].classList.add(color);
  });
}

function mostrarPuntos(puntos) {
  document.querySelector('#puntos').innerText = `Puntos: ${puntos}`;
}

function mostrarIntentos(puntos) {
  document.querySelector('#intentos').innerText = `Intentos: ${puntos}`;
}
