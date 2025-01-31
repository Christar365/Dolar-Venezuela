// Cargar valores guardados o inicializar en 0
let valores = JSON.parse(localStorage.getItem('valoresDolar')) || {
  bcv: 0,
  paralelo: 0,
  promedio: 0,
  fecha: "8:29PM 30/01/25"
};

// Función para guardar en localStorage
function guardarValores() {
  localStorage.setItem('valoresDolar', JSON.stringify(valores));
}

// Función para calcular el promedio
function calcularPromedio(bcv, paralelo) {
  return ((bcv + paralelo) / 2).toFixed(2);
}

// Función para formatear fecha
function formatearFecha(fecha) {
  const horas = fecha.getHours() > 12 ? fecha.getHours() - 12 : fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const ampm = fecha.getHours() >= 12 ? 'PM' : 'AM';
  return `${horas}:${minutos}${ampm} ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear().toString().slice(-2)}`;
}

// Función para actualizar valores
async function actualizarValores() {
  try {
    // Consultar API
    const respuesta = await fetch("https://ve.dolarapi.com/v1/dolares");
    const datos = await respuesta.json();

    // Extraer BCV y Paralelo
    const bcv = datos.find(d => d.nombre === "Oficial")?.promedio || 0;
    const paralelo = datos.find(d => d.nombre === "Paralelo")?.promedio || 0;

    // Calcular promedio
    const promedio = calcularPromedio(bcv, paralelo);

    // Actualizar valores
    valores.bcv = bcv;
    valores.paralelo = paralelo;
    valores.promedio = promedio;
    valores.fecha = formatearFecha(new Date());

    // Guardar y mostrar
    guardarValores();
    mostrarValores();
  } catch (error) {
    alert("Error al actualizar. Usando últimos valores guardados.");
    console.error(error);
  }
}

// Mostrar valores en la interfaz
function mostrarValores() {
  document.getElementById("bcv").textContent = valores.bcv;
  document.getElementById("paralelo").textContent = valores.paralelo;
  document.getElementById("promedio").textContent = valores.promedio;
  document.getElementById("fecha").textContent = valores.fecha;
}
console.log('Script cargado correctamente');

// Inicializar con valores guardados
mostrarValores();