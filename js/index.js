// Código JavaScript

// Añadimos datos de usuario y lo añadimos a la tabla
datosUser[0] =  "Jose Luis";
datosUser[1] =  "Martin";
datosUser[2] =  "Hombre";
datosUser[3] =  "678912345";
datosUser[4] =  "joseluis@gmail.com";
datosUser[5] =  "Quiero ir a Japón 15 días";
datosUser[6] =  "japon.jpg";

window.onload = agregarFila();

// Añadimos datos de usuario y lo añadimos a la tabla
datosUser[0] =  "Aroa";
datosUser[1] =  "Gil";
datosUser[2] =  "Mujer";
datosUser[3] =  "654321987";
datosUser[4] =  "aroa@gmail.com";
datosUser[5] =  "Tengo 8 días para ir a Bali";
datosUser[6] =  "bali.jpg";

window.onload = agregarFila();

// Añadimos datos de usuario y lo añadimos a la tabla
datosUser[0] =  "Nuria";
datosUser[1] =  "Núñez";
datosUser[2] =  "Mujer";
datosUser[3] =  "612345789";
datosUser[4] =  "nuria@gmail.com";
datosUser[5] =  "Quiero ir a la Selva Negra, cuantos días crees que es mejor?";
datosUser[6] =  "";

window.onload = agregarFila();

// Función Agregar Fila
function agregarFila(){

    // Agregamos fila al final del todo
    let tabla = document.getElementById("tabla");
    let row = tabla.insertRow(-1);

    // Agregamos las celdas de la fila
    let acciones = row.insertCell(0);
    let nombre = row.insertCell(1);
    let apellidos = row.insertCell(2);
    let sexo = row.insertCell(3);
    let telefono = row.insertCell(4);
    let email = row.insertCell(5);
    let idea = row.insertCell(6);
    let foto = row.insertCell(7);

    // Indicamos el valor de las celdas
    nombre.innerHTML = datosUser[0];
    apellidos.innerHTML = datosUser[1];
    sexo.innerHTML = datosUser[2];
    telefono.innerHTML = datosUser[3];
    email.innerHTML = datosUser[4];
    idea.innerHTML = datosUser[5];
    foto.innerHTML = datosUser[6];
    
    // Creamos el checkbox para la celda acciones
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.name = "checkbox";
    acciones.appendChild(checkbox);

    // Borramos la fila al hacer checked
    checkbox.addEventListener("click", (event) => {
        event.target.parentNode.parentNode.remove();
    })
}

// Añadimos onclick al input del buscador de la tabla y filtramos
let filtrado = document.getElementById("filtrado");
filtrado.onclick = filtrar;

// Filtramos datos por nombre o apellido
function filtrar() {
    let tabla = document.getElementById("tabla");
    let filtrado = document.getElementById("filtrado").value.toLowerCase();
    let celdas = "";
    let busqueda = false;
    let comparar = "";

    for (let i=1; i<tabla.rows.length; i++) {
        celdas = tabla.rows[i].getElementsByTagName("td");
        busqueda = false;

        for (let j=0; j<celdas.length && !busqueda; j++){
            comparar = celdas[j].innerHTML.toLowerCase(); 

            if (filtrado.length == 2 || (comparar.indexOf(filtrado) > -1)){
                busqueda = true;
            }
        }

        if(busqueda){
            tabla.rows[i].style.display = "";
        } else {
            tabla.rows[i].style.display = "none";
        }
    }
}

filtrado.addEventListener('keyup', filtrar);

