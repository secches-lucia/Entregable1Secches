"use strict";

let discos = [];
let discoMayorDuracionTotal = 0;

class Disco {
  constructor(nombre, autor, codigo, pistas) {
    this.nombre = nombre;
    this.autor = autor;
    this.codigo = codigo;
    this.pistas = pistas;
  }
}

class Pista {
  constructor(nombre, duracion) {
    this.nombre = nombre;
    this.duracion = duracion;
  }
}

// Contador
let contadorDiscos = 0;
// Función Cargar:
const Cargar = () => {
  let nombreDisco;
  let autorDisco;
  let codigoDisco;
  let pistas = [];
  let nombrePista;
  let duracionPista;
  let duracionTotal = 0;

  // El nombre del disco, autor/banda y nombre de la pista no pueden quedar vacíos.

  // Datos discos:
  nombreDisco = prompt("Ingresa el nombre del disco.");
  if (!nombreDisco) {
    alert("Por favor ingresar un nombre.");
    return;
  }

  autorDisco = prompt("Ingresa el nombre del autor o banda del disco.");
  if (!autorDisco) {
    alert("Por favor ingresar un autor o banda.");
    return;
  }

  do {
    codigoDisco = parseInt(prompt("Ingresa el código único del disco (del 1 al 999)."));
    if (codigoDisco >= 1 && codigoDisco <= 999) {
      // Si el código ya fue utilizado:
      if (discos.some(disco => disco.codigo === codigoDisco)) {
        alert("El código del disco ya fue utilizado.");
      } else {
        break;
      }
    } else if (codigoDisco === null) {
      return;
    } else {
      // Si el usuario deja el campo vacío.
      alert("Elija un número entre 1 y 999.");
    }
  } while (true);

  // Datos pistas:
  while (true) {
    do {
      nombrePista = prompt("Ingresa el nombre de la pista.");
        if (!nombrePista) {
          alert("Por favor, ingresa un nombre.");
      }
    } while (!nombrePista);

    do {
      duracionPista = parseInt(prompt("Ingresa la duración de la pista (en segundos)"));
        if (!duracionPista) {
          alert("Por favor, ingresa la duración de la pista (en segundos).");
      } else if (duracionPista > 7200) {
        alert("La duración de la pista no puede exceder los 7200 segundos.");
      }
    } while (isNaN(duracionPista) || duracionPista <= 0 || duracionPista > 7200);


    let pistaCargada = new Pista(nombrePista, duracionPista);
    pistas.push(pistaCargada);

    duracionTotal += duracionPista;

    if (!confirm("¿Quieres ingresar otra pista?")) {
      break;
    }
  }

  let discoCargado = new Disco(nombreDisco, autorDisco, codigoDisco, pistas);
  discos.push(discoCargado);

  // Duración mayor total de cada disco:
  if (duracionTotal > discoMayorDuracionTotal) {
    discoMayorDuracionTotal = duracionTotal;
  }

  // Añadimos contador
  contadorDiscos++;
};

// Función Mostrar:
const Mostrar = () => {
  // Variable para ir armando la cadena:
  let html = "";

  for (let disco of discos) {
    let duracionTotal = 0;
    let mayorDuracion = null;

    for (let pista of disco.pistas) {
      duracionTotal += pista.duracion;

      if (!mayorDuracion || pista.duracion > mayorDuracion.duracion) {
        mayorDuracion = pista;
      }
    }

    let promedioDisco = duracionTotal / disco.pistas.length;

    html += ` <h3>${disco.nombre}</h3>
              <p><span style="font-weight: bold">Artista/s:</span> ${disco.autor}</p>
              <div id="detalles">
              <p><span style="font-weight: bold">Código numérico:</span> ${disco.codigo}</p>
              <p><span style="font-weight: bold">Cantidad de pistas:</span> ${disco.pistas.length}</p>
              <p><span style="font-weight: bold">Duración total:</span> ${duracionTotal} segundos</p>
              <p><span style="font-weight: bold">Promedio de duración:</span> ${promedioDisco.toFixed()} segundos</p>
              `;

    if (mayorDuracion) {
      html += `<p><span style="font-weight: bold">Pista con mayor duración:</span> ${mayorDuracion.nombre} (${mayorDuracion.duracion} segundos)</p></div>`;
    }

    for (let pista of disco.pistas) {
      html += `<h4>${pista.nombre}</h4>`;
      if (pista.duracion > 180) {
        html += `<p style="color: red"><span style="font-weight: bold">Duración:</span> ${pista.duracion} segundos.</p>`;
      } else {
        html += `<p><span style="font-weight: bold">Duración:</span> ${pista.duracion} segundos.</p>`;
      }
    }
  }

  html += `<hr>
          <p><span style="font-weight: bold">Duración total más alta entre todos los discos ingresados:</span> ${discoMayorDuracionTotal} segundos.</p>
          <p><span style="font-weight: bold">Ingresó en total:</span> ${contadorDiscos} discos.</p>`;

  // Si modificaste el nombre de la variable para ir armando la cadena, también hazlo acá:
  document.getElementById("info").innerHTML = html; // <--- ahí es acá
};

const Buscar = () => {
  let htmlBusqueda = "";
  let busqueda;
  let resultado;

  do {
    busqueda = parseInt(prompt("Introduce el código numérico del disco a buscar."));
  } while (isNaN(busqueda));
  resultado = discos.filter(disco => disco.codigo == busqueda);

  if (resultado.length > 0) {
    let disco = resultado[0];
    htmlBusqueda += `<h3>${disco.nombre}</h3>
            <p><span style="font-weight: bold">Artista/s:</span> ${disco.autor}</p>
            <p><span style="font-weight: bold">Código numérico:</span> ${disco.codigo}</p>`;
    for (let pista of disco.pistas) {
      htmlBusqueda += `<h4>${pista.nombre}</h4>`;
      if (pista.duracion > 180) {
        htmlBusqueda += `<p style="color: red"><span style="font-weight: bold">Duración:</span> ${pista.duracion} segundos.</p>`;
      } else {
        htmlBusqueda += `<p><span style="font-weight: bold">Duración:</span> ${pista.duracion} segundos.</p>`;
      }
    }
    document.getElementById("busqueda").innerHTML = htmlBusqueda;
  } else {
    alert(`No se encontró ningún disco con el código numérico ${busqueda}.`);
  }
};
