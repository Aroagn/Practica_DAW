// Código JavaScript

window.onload = agregarFila(datosUser);

// Función para agregar una fila a la tabla con nuevos datos
function agregarFila(datosUser){

    let tabla = document.getElementById('table');
    let num = 1;

    datosUser.forEach(element => {
        // Insertamos una fila al final del resto
        let row = tabla.insertRow(-1);

        row.id = "fila" + num;
        fila = row.id;

        console.log(fila);

        // Agregamos las celdas de la fila
        let celdaAcciones = row.insertCell(0);
        let celdaNombre = row.insertCell(1);
        let celdaApellidos = row.insertCell(2);
        let celdaSexo = row.insertCell(3);
        let celdaTelefono = row.insertCell(4);
        let celdaEmail = row.insertCell(5);
        let celdaIdea = row.insertCell(6);
        let celdaFoto = row.insertCell(7);

        // Indicamos el valor de las celdas
        celdaNombre.innerHTML = element.nombre;
        celdaApellidos.innerHTML = element.apellidos;
        celdaSexo.innerHTML = element.sexo;
        celdaTelefono.innerHTML = element.telefono;
        celdaEmail.innerHTML = element.email;
        celdaIdea.innerHTML = element.idea;
        celdaFoto.innerHTML = element.foto; 

        // Creamos el botón de borrar para la celda acciones
        let botonBorrar = document.createElement('input');
        botonBorrar.type = 'button';
        botonBorrar.id = 'borrar';
        botonBorrar.value = 'Borrar';
        celdaAcciones.appendChild(botonBorrar);

        // Borramos la fila al hacer checked
        botonBorrar.addEventListener('click', (event) => {
            let fila = event.target.parentNode.parentNode;
            fila.remove();
        })
        
        // Creamos el botón de modificar para la celda acciones
        let botonModificar = document.createElement('input');
        botonModificar.type = 'button';
        botonModificar.id = 'modificar';
        botonModificar.value = 'Modificar';
        celdaAcciones.appendChild(botonModificar);
        
        // Modificamos la fila al hacer checked
        botonModificar.addEventListener('click', (event) => {
            formulario(element, row);
        })

        row++;  
        num++;  
    });
}

// Función para ver los datos a modificar en el formulario
function formulario(element, fila) {
    let main = document.querySelector('main');
    let formTabla = document.createElement('form');
    main.appendChild(formTabla);
    formTabla.innerHTML = `
        <fieldset id="datos">
            <legend><strong>Datos personales</strong></legend>
        
            <div id="izq">
                <label for="nombre">Nombre: </label>
                <input type="text" name="nombre" id="nombre" maxlength="50"/><br>
                
                <label for="apellidos">Apellidos: </label>
                <input type="text" name="apellidos" id="apellidos" maxlength="80"/><br>
                
                <label for="sexo">Sexo: </label>
                <p>
                    <input type="radio" name="sexo" id="mujer"/> 
                    <label for="mujer">Mujer</label>

                    <input type="radio" name="sexo"id="hombre"/> 
                    <label for="hombre">Hombre</label>
                </p><br>
            </div>

            <div id="dcha">
                <label for="telefono">Teléfono: </label>
                <input type="text" name="telefono" id="telefono"/><br>

                <label for="email">Email: </label>
                <input type="text" name="email" id="email" maxlength="100"/><br>

                <label for="password">Constraseña: </label>
                <input type="password" name="password" id="password"/><br>
            </div>
            </fieldset><br>

        <fieldset id="viaje">
            <legend><strong>Ideas del viaje</strong></legend>

            <textarea id="idea" name="idea" rows="6" cols="60"></textarea>
            
            <p>
                <label for="foto">Añade una foto de tu itinerario si lo prefieres: </label>
                <input accept="image/jpeg,image/png,image/pdf" type="file" name="foto" id="foto" /><br>
            </p>
        </fieldset>

        <fieldset id="enviar">
            <legend><strong>Revise los datos y envíe el formulario</strong></legend>

            <button type="submit" name="enviarForm" id="enviarForm">Enviar formulario</button>
            <button type="button" onclick="save('${fila}')" name="guardar" id="guardar">Guardar datos</button>

            <p>En cuanto reciba todos los datos te mandaré un presupuesto.</p>
            <p><u><strong>Gracias por confiar en mí!!</strong></u></p>
        </fieldset>
    `;

    let valorNombre = document.getElementById('nombre');
    let valorApellidos = document.getElementById('apellidos');
    let valorSexo = document.getElementById('sexo');
    let valorTelefono = document.getElementById('telefono');
    let valorEmail = document.getElementById('email');
    let valorIdea = document.getElementById('idea');
    let valorFoto = document.getElementById('foto');

    valorNombre.value = element.nombre;
    valorApellidos.value = element.apellidos;
    //valorSexo.value = element.sexo;
    valorTelefono.value = element.telefono;
    valorEmail.value = element.email;
    valorIdea.value = element.idea;
    //valorFoto.value = element.foto;
}


// Guardamos los datos nuevos en la fila de la tabla modificada
function save (fila) {

    let tabla = document.getElementById('table');
    let filas = tabla.getElementsByTagName('tr');

    let cellNombre = document.getElementById('nombre').value;
    let cellApellidos = document.getElementById('apellidos').value
    let cellSexo = document.getElementById('sexo');
    let cellTelefono = document.getElementById('telefono').value;
    let cellEmail = document.getElementById('email').value;
    let cellIdea = document.getElementById('idea').value;
    let cellFoto = document.getElementById('foto').value;

    console.log(cellNombre);

    for (let i=0; i<=filas.length; i++) {
        if (fila[i] === fila) {
            fila = 
                "<td><input type='button' id='borrar' value='Borrar'>" +
                    "<input type='button' id='modificar' value='Modificar'></td>" +
                "<td>" + cellNombre + "</td>" +
                "<td>" + cellApellidos + "</td>" +
                "<td>" + cellSexo + "</td>" +
                "<td>" + cellTelefono + "</td>" +
                "<td>" + cellEmail + "</td>" +
                "<td>" + cellIdea + "</td>" +
                "<td>" + cellFoto + "</td>";
        }
    }
}


// Filtramos datos por nombre o apellido
function filtrar() {
    let tabla = document.getElementById("table");
    let search = document.getElementById("search").value.toLowerCase();
    let celdas = "";
    let busqueda = false;
    let comparar = "";
    
    for (let i=1; i<tabla.rows.length; i++) {
        celdas = tabla.rows[i].getElementsByTagName("td");
        busqueda = false;

        for (let j=0; j<celdas.length && !busqueda; j++){
            comparar = celdas[j].innerHTML.toLowerCase(); 

            if (search.length == 2 || (comparar.indexOf(search) > -1)){
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


