"use strict";

let discos = [];
let discoMayorDuracionTotal = 0;
let contadorDiscos = 0;

// Clases mejoradas
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

  obtenerPromedioDuracion() {
    return this.obtenerDuracionTotal() / this.pistas.length;
  }

  obtenerPistaMayorDuracion() {
    return this.pistas.reduce((mayor, pista) =>
      !mayor || pista.duracion > mayor.duracion ? pista : mayor
    );
  }
}

class Pista {
  constructor(nombre, duracion) {
    this.nombre = nombre;
    this.duracion = duracion;
  }
}

// Función Cargar:
const Cargar = () => {
  let nombreDisco = "";
  let autorDisco = "";
  let codigoDisco;

  // Validar nombre del disco
  while (!nombreDisco.trim()) {
    nombreDisco = prompt("Ingresá el nombre del disco (no puede estar vacío):").trim();
    if (!nombreDisco) {
      alert("Por favor, ingresá un nombre válido.");
    }
  }

  // Validar autor/banda
  while (!autorDisco.trim()) {
    autorDisco = prompt("Ingresá el nombre del autor o banda del disco (no puede estar vacío):").trim();
    if (!autorDisco) {
      alert("Por favor, ingresá un autor o banda válido.");
    }
  }

  // Validar código único con confirmación al cancelar
  while (true) {
    let input = prompt("Ingresá el código único del disco (del 1 al 999):");
    if (input === null) {
      if (confirm("¿Estás seguro de que deseás cancelar? Perderás los datos ingresados.")) {
        return;
      }
    } else {
      codigoDisco = parseInt(input);
      if (isNaN(codigoDisco) || codigoDisco < 1 || codigoDisco > 999) {
        alert("Por favor, ingresá un número entre 1 y 999.");
      } else if (discos.some(disco => disco.codigo === codigoDisco)) {
        alert("El código del disco ya fue utilizado. Intentá con otro código.");
      } else {
        break;
      }
    }
  }

  // Crear disco
  const disco = new Disco(nombreDisco, autorDisco, codigoDisco);

  // Validar pistas
  do {
    let nombrePista = "";
    let duracionPista;

    // Validar nombre de la pista
    while (!nombrePista.trim()) {
      nombrePista = prompt("Ingresá el nombre de la pista (no puede estar vacío):").trim();
      if (!nombrePista) {
        alert("Por favor, ingresá un nombre válido.");
      }
    }

    // Validar duración de la pista con instrucciones
    while (true) {
      duracionPista = parseInt(
        prompt("Ingresá la duración de la pista en segundos (debe estar entre 1 y 7200):")
      );
      if (isNaN(duracionPista) || duracionPista <= 0) {
        alert("Por favor, ingresá un número válido mayor a 0.");
      } else if (duracionPista > 7200) {
        alert("La duración de la pista no puede exceder los 7200 segundos.");
      } else {
        break;
      }
    }

    // Crear y agregar pista al disco
    const pista = new Pista(nombrePista, duracionPista);
    disco.agregarPista(pista);
  } while (confirm("¿Querés ingresar otra pista?"));

  // Guardar disco
  discos.push(disco);

  // Actualizar duración mayor total
  const duracionTotal = disco.obtenerDuracionTotal();
  if (duracionTotal > discoMayorDuracionTotal) {
    discoMayorDuracionTotal = duracionTotal;
  }

  contadorDiscos++;
};

// Función Mostrar:
const Mostrar = () => {
  let html = "";

  for (let disco of discos) {
    const duracionTotal = disco.obtenerDuracionTotal();
    const promedioDuracion = disco.obtenerPromedioDuracion();
    const mayorDuracion = disco.obtenerPistaMayorDuracion();

    html += `
      <h3>${disco.nombre}</h3>
      <p><span style="font-weight: bold">Artista/s:</span> ${disco.autor}</p>
      <div id="detalles">
        <p><span style="font-weight: bold">Código numérico:</span> ${disco.codigo}</p>
        <p><span style="font-weight: bold">Cantidad de pistas:</span> ${disco.pistas.length}</p>
        <p><span style="font-weight: bold">Duración total:</span> ${duracionTotal} segundos</p>
        <p><span style="font-weight: bold">Promedio de duración:</span> ${promedioDuracion.toFixed(2)} segundos</p>
        ${
          mayorDuracion
            ? `<p><span style="font-weight: bold">Pista con mayor duración:</span> ${mayorDuracion.nombre} (${mayorDuracion.duracion} segundos)</p>`
            : ""
        }
      </div>`;

    for (let pista of disco.pistas) {
      html += `
        <h4>${pista.nombre}</h4>
        <p style="color: ${pista.duracion > 180 ? "red" : "black"}">
          <span style="font-weight: bold">Duración:</span> ${pista.duracion} segundos.
        </p>`;
    }
  }

  html += `<hr>
    <p><span style="font-weight: bold">Duración total más alta entre todos los discos ingresados:</span> ${discoMayorDuracionTotal} segundos.</p>
    <p><span style="font-weight: bold">Ingresó en total:</span> ${contadorDiscos} discos.</p>`;

  document.getElementById("info").innerHTML = html;
};



const Buscar = () => {
  let htmlBusqueda = "";
  let busqueda;
  let resultado;

  do {
    busqueda = parseInt(prompt("Introducí el código numérico del disco a buscar."));
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