"use strict";

// Clase Disco
class Disco {
  constructor(nombre, autor, codigo) {
    this.nombre = nombre;
    this.autor = autor;
    this.codigo = codigo;
    this.pistas = [];
  }

  agregarPista(pista) {
    this.pistas.push(pista);
  }

  obtenerDuracionTotal() {
    return this.pistas.reduce((total, pista) => total + pista.duracion, 0);
  }
}

// Clase Pista
class Pista {
  constructor(nombre, duracion) {
    this.nombre = nombre;
    this.duracion = duracion;
  }
}

let discos = [];

// Mostrar formulario
document.getElementById('mostrarFormularioBtn').addEventListener('click', () => {
  document.getElementById('formularioCargarDisco').style.display = 'block';
});

// Agregar pista al formulario
document.getElementById('agregarPistaBtn').addEventListener('click', () => {
  const nombrePista = document.getElementById('nombrePista').value.trim();
  const duracionPista = parseInt(document.getElementById('duracionPista').value);

  if (!nombrePista || isNaN(duracionPista) || duracionPista <= 0 || duracionPista > 7200) {
    mostrarMensaje('error', 'Datos inválidos para la pista.');
    return;
  }

  const pistaDiv = document.createElement('div');
  pistaDiv.innerHTML = `<span>${nombrePista} - ${duracionPista} segundos</span>`;
  pistaDiv.dataset.nombre = nombrePista;
  pistaDiv.dataset.duracion = duracionPista;

  document.getElementById('listaPistas').appendChild(pistaDiv);
  document.getElementById('nombrePista').value = '';
  document.getElementById('duracionPista').value = '';
});

// Guardar disco
document.getElementById('formCargarDisco').addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombreDisco').value.trim();
  const autor = document.getElementById('autorDisco').value.trim();
  const codigo = parseInt(document.getElementById('codigoDisco').value);

  if (discos.some(disco => disco.codigo === codigo)) {
    mostrarMensaje('error', 'El código del disco ya existe.');
    return;
  }

  const nuevoDisco = new Disco(nombre, autor, codigo);
  const pistas = Array.from(document.querySelectorAll('#listaPistas div'));
  pistas.forEach(pista => {
    const nombrePista = pista.dataset.nombre;
    const duracionPista = parseInt(pista.dataset.duracion);
    nuevoDisco.agregarPista(new Pista(nombrePista, duracionPista));
  });

  discos.push(nuevoDisco);
  localStorage.setItem('discos', JSON.stringify(discos));

  mostrarMensaje('success', 'Disco guardado exitosamente.');
  Mostrar();
  event.target.reset();
  document.getElementById('listaPistas').innerHTML = '';
});

// Mostrar discos
const Mostrar = () => {
  const info = document.getElementById('info');
  info.innerHTML = '';
  discos.forEach(disco => {
    const duracionTotal = disco.obtenerDuracionTotal();
    const discoDiv = document.createElement('div');
    discoDiv.innerHTML = `
      <h3>${disco.nombre}</h3>
      <p>Autor: ${disco.autor}</p>
      <p>Código: ${disco.codigo}</p>
      <p>Duración Total: ${duracionTotal} segundos</p>
    `;
    info.appendChild(discoDiv);
  });
};

// Mostrar mensaje en pantalla
const mostrarMensaje = (tipo, mensaje) => {
  const mensajeDiv = document.createElement('div');
  mensajeDiv.className = tipo === 'success' ? 'mensaje-exito' : 'mensaje-error';
  mensajeDiv.textContent = mensaje;

  document.body.appendChild(mensajeDiv);
  setTimeout(() => mensajeDiv.remove(), 3000);
};

// Cargar discos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  const discosGuardados = localStorage.getItem('discos');
  if (discosGuardados) {
    discos = JSON.parse(discosGuardados).map(discoData => {
      const disco = new Disco(discoData.nombre, discoData.autor, discoData.codigo);
      discoData.pistas.forEach(p => disco.agregarPista(new Pista(p.nombre, p.duracion)));
      return disco;
    });
  }
  Mostrar();
});

