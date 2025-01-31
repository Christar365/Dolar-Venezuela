// Variables para los elementos del DOM
const pantallaMenu = document.getElementById('pantalla-menu');
const pantallaValores = document.getElementById('pantalla-valores');

const btnConsultar = document.getElementById('btn-consultar');
const btnActualizar = document.getElementById('btn-actualizar');
const btnVolver = document.getElementById('btn-volver');

const bcvElemento = document.getElementById('bcv');
const paraleloElemento = document.getElementById('paralelo');
const promedioElemento = document.getElementById('promedio');
const fechaElemento = document.getElementById('fecha');

// Event Listeners para los botones
btnConsultar.addEventListener('click', () => {
  mostrarPantallaValores();
  mostrarValoresGuardados();
});

btnActualizar.addEventListener('click', actualizarValores);

btnVolver.addEventListener('click', mostrarPantallaMenu);

// Funciones para navegar entre pantallas
function mostrarPantallaMenu() {
  pantallaValores.style.display = 'none';
  pantallaMenu.style.display = 'block';
}

function mostrarPantallaValores() {
  pantallaMenu.style.display = 'none';
  pantallaValores.style.display = 'block';
}

// Función para mostrar los valores guardados
function mostrarValoresGuardados() {
  const valores = JSON.parse(localStorage.getItem('valoresDolar')) || {
    bcv: '-',
    paralelo: '-',
    promedio: '-',
    fecha: '-'
  };

  bcvElemento.textContent = valores.bcv;
  paraleloElemento.textContent = valores.paralelo;
  promedioElemento.textContent = valores.promedio;
  fechaElemento.textContent = valores.fecha;
}

// Función para actualizar los valores del dólar
async function actualizarValores() {
  try {
    btnActualizar.disabled = true;
    btnActualizar.textContent = 'Actualizando...';

    const respuesta = await fetch("https://ve.dolarapi.com/v1/dolares");
    const datos = await respuesta.json();

    const bcv = datos.find(d => d.nombre === "Oficial")?.promedio || '-';
    const paralelo = datos.find(d => d.nombre === "Paralelo")?.promedio || '-';
    const promedio = ((parseFloat(bcv) + parseFloat(paralelo)) / 2).toFixed(2);

    const fecha = new Date().toLocaleString('es-VE');

    // Guardar en localStorage
    const valores = { bcv, paralelo, promedio, fecha };
    localStorage.setItem('valoresDolar', JSON.stringify(valores));

    // Mostrar en pantalla
    bcvElemento.textContent = bcv;
    paraleloElemento.textContent = paralelo;
    promedioElemento.textContent = promedio;
    fechaElemento.textContent = fecha;

  } catch (error) {
    alert("No se pudo actualizar. Por favor, verifica tu conexión a Internet.");
    console.error(error);
  } finally {
    btnActualizar.disabled = false;
    btnActualizar.textContent = 'Actualizar';
  }
}

// Mostrar pantalla Menú al cargar la aplicación
mostrarPantallaMenu();