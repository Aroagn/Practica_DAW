
// Llamada asíncrona al cargar usuarios
const cargarBD = async () => {

    let response = await fetch('ws/getUsuario.php?id=');

    let result = await response.json();
    let datosUser = result.data;
    agregarFila(datosUser);
}

cargarBD();


// Función para agregar una fila a la tabla con nuevos datos
function agregarFila(datosUser){

    let tabla = document.getElementById('table');
    let numId = 1;

    datosUser.forEach(element => {
        // Insertamos una fila al final de la tabla
        let row = tabla.insertRow(-1);

        row.id = numId;

        // Agregamos las celdas de la fila
        let celdaAcciones = row.insertCell(0);
        let celdaNombre = row.insertCell(1);
        let celdaApellidos = row.insertCell(2);
        let celdaSexo = row.insertCell(3);
        let celdaTelefono = row.insertCell(4);
        let celdaEmail = row.insertCell(5);

        // Indicamos el valor de las celdas
        celdaNombre.innerHTML = element.nombre;
        celdaApellidos.innerHTML = element.apellidos;
        celdaSexo.innerHTML = element.sexo;
        celdaTelefono.innerHTML = element.telefono;
        celdaEmail.innerHTML = element.email;

        // Creamos el botón de borrar para la celda acciones
        let botonBorrar = document.createElement('input');
        botonBorrar.type = 'button';
        botonBorrar.id = 'borrar';
        botonBorrar.value = 'Borrar';
        celdaAcciones.appendChild(botonBorrar);

        // Creamos el botón de modificar para la celda acciones
        let botonModificar = document.createElement('input');
        botonModificar.type = 'button';
        botonModificar.id = 'modificar';
        botonModificar.value = 'Modificar';
        celdaAcciones.appendChild(botonModificar);

        // Borramos la fila al hacer checked
        botonBorrar.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                title: 'Vas a borrar un usuario',
                text: "¿Quieres continuar?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#48B0D5',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
        
            }).then((resultado) => {
        
                if (resultado.isConfirmed) {

                    fetch('ws/deleteUsuario.php?id=' + numId)
                    .then(response => response.json())
                    
                    .then(response => {
                        console.log(response);
                        response = e.target.parentNode.parentNode.remove();
                    })

                    Swal.fire(
                        'Confirmado!',
                        'Tu usuario ha sido borrado.',
                        'success'
                    )

                } else {
                    Swal.fire(
                        'Cancelado!',
                        'Has cancelado la operación.',
                        'error'
                    )
                }
            }).catch(error => console.log('error', error));
        })
        
        // Modificamos la fila al hacer checked
        botonModificar.addEventListener('click', (e) => {
            formulario(element, row);
        })

        // Añadimos una fila con un id
        row++;  
        numId++;  
    });
}


// Función para ver los datos a modificar en el formulario
function formulario(element, row) {

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

        <fieldset id="enviar">
            <legend><strong>Revise los datos y envíe el formulario</strong></legend>

            <button type="submit" name="guardar" id="guardar">Guardar datos</button>
        </fieldset>
    `;

    let valorNombre = document.getElementById('nombre');
    let valorApellidos = document.getElementById('apellidos');
    let valorSexo = document.getElementById('sexo');
    let valorTelefono = document.getElementById('telefono');
    let valorEmail = document.getElementById('email');

    valorNombre.value = element.nombre;
    valorApellidos.value = element.apellidos;
    valorSexo = element.sexo;
    valorTelefono.value = element.telefono;
    valorEmail.value = element.email;

    console.log(valorNombre.value);

    // Guardamos los datos nuevos en la fila de la tabla modificada
    let formulario = document.querySelector('form');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let data =  new FormData(formulario);
    
        valorNombre = data.get('nombre');
        valorApellidos = data.get('apellidos'); 
        valorSexo = data.get('sexo');
        valorTelefono = data.get('telefono'); 
        valorEmail = data.get('email');

        console.log(valorNombre);

        Swal.fire({
            title: 'Vas a mofificar un usuario',
            text: "¿Quieres continuar?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#48B0D5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'

        }).then((resultado) => {

            if (resultado.isConfirmed) {

                fetch('ws/modificarUsuario.php?id=' + row[i])
                .then(resp => resp.json())
                .then(response => console.log(response))

                let tabla = document.getElementById('table');
                let rows = tabla.getElementsByTagName('tr');

                for (let i=0; i<=rows.length; i++) {
                    if (row[i] === row) {
                        row = 
                            "<td><input type='button' id='borrar' value='Borrar'>" +
                                "<input type='button' id='modificar' value='Modificar'></td>" +
                            "<td>" + valorNombre + "</td>" +
                            "<td>" + valorApellidos + "</td>" +
                            "<td>" + valorSexo + "</td>" +
                            "<td>" + valorTelefono + "</td>" +
                            "<td>" + valorEmail + "</td>"
                    }
                }
                
                Swal.fire(
                    'Confirmado!',
                    'Tu usuario ha sido modificado.',
                    'success'
                )

            } else {
                Swal.fire(
                    'Cancelado!',
                    'Has cancelado la operación.',
                    'error'
                )
            }
        }).catch(error => console.log('error', error));
    })
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


