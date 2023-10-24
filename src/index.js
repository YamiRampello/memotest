const $cuadros = document.querySelectorAll('.cuadro');
const $finJuego = document.querySelectorAll('.fin-juego');
const $tablero = document.querySelector('#tablero');
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
  const cuadrosPorIntentos = 2;
  const RETRASO_USUARIO_EN_MS = 400;
  const intentosMaximos = 11;

  mostrarCuadro($cuadro);

  secuenciaUsuario.push($cuadro);
  secuenciaUsuarioClase.push($cuadroClase);

  if (secuenciaUsuarioClase.length === cuadrosPorIntentos) {
    const primerCuadroSeleccionado = secuenciaUsuarioClase[0];
    const segundoCuadroSeleccionado = secuenciaUsuarioClase[1];

    if (primerCuadroSeleccionado === segundoCuadroSeleccionado) {
      puntos++;
    } else {
      secuenciaUsuario.forEach(function ($cuadro) {
        setTimeout(function () {
          ocultarCuadro($cuadro);
        }, RETRASO_USUARIO_EN_MS);
      });
    }
    secuenciaUsuario = [];
    secuenciaUsuarioClase = [];
    intentos++;
    mostrarPuntos(puntos);
    mostrarIntentos(intentos);
  }

  if (puntos === cantidadCuadros) {
    actualizarEstado('Ganaste!!. Toca reiniciar para voler a jugar', true);
    bloquearInputUsuario();
  }

  if ((intentos >= intentosMaximos) & (puntos < cantidadCuadros)) {
    $tablero.style.display = 'none';
    document.querySelector('#perdiste').style.display = 'block';
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
  if (!error) {
    $estado.classList.remove('alert-danger');
    $estado.classList.add('alert-success');
  } else {
    $estado.classList.remove('alert-success');
    $estado.classList.add('alert-danger');
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
    const clase = 'cuadro h-100';

    if ($cuadros[i].classList.value === clase) {
      $cuadros[i].classList.add(color);
    } else {
      $cuadros[i].classList.remove(...$cuadros[i].classList);
      $cuadros[i].classList = clase + ' ' + color;
    }
  });
}

function mostrarPuntos(puntos) {
  document.querySelector('#puntos').innerText = `Puntos: ${puntos}`;
}

function mostrarIntentos(puntos) {
  document.querySelector('#intentos').innerText = `Intentos: ${puntos}`;
}

const $reiniciar = document.querySelector('#reiniciar');
$reiniciar.onclick = reiniciarJuego;

function reiniciarJuego() {
  actualizarEstado('Turno del jugador');
  retornarFormatoInicial();

  $cuadros.forEach(function ($cuadro) {
    ocultarCuadro($cuadro);
  });

  secuenciaUsuario = [];
  secuenciaUsuarioClase = [];
  puntos = 0;
  intentos = 0;

  mostrarPuntos(puntos);
  mostrarIntentos(intentos);
  configurarJuego();
  manejarInputUsuario();
}

function retornarFormatoInicial() {
  document.querySelector('#perdiste').style.display = 'none';
  $tablero.style.display = 'block';
}
