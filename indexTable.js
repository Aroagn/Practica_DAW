
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

                        Swal.fire(
                            'Confirmado!',
                            'Tu usuario ha sido borrado.',
                            'success'
                        )
                    })

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

        <fieldset id="enviar">
            <legend><strong>Revise los datos y envíe el formulario</strong></legend>

            <button type="submit" onclick="save('${fila}')" name="guardar" id="guardar">Guardar datos</button>
        </fieldset>
    `;

    let valorNombre = document.getElementById('nombre');
    let valorApellidos = document.getElementById('apellidos');
    let valorTelefono = document.getElementById('telefono');
    let valorEmail = document.getElementById('email');

    valorNombre.value = element.nombre;
    valorApellidos.value = element.apellidos;
    valorTelefono.value = element.telefono;
    valorEmail.value = element.email;
}


// Guardamos los datos nuevos en la fila de la tabla modificada
function save (fila) {

    let formulario = document.querySelector('form');
    let datos =  new FormData(formulario);

    cellNombre = datos.get('nombre');
    cellApellidos = datos.get('apellidos'); 
    cellSexo = datos.get('sexo');
    cellTelefono = datos.get('telefono'); 
    cellEmail = datos.get('email');

    /*
    let cellNombre = document.getElementById('nombre').value;
    let cellApellidos = document.getElementById('apellidos').value
    let cellSexo = document.getElementById('sexo').value;
    let cellTelefono = document.getElementById('telefono').value;
    let cellEmail = document.getElementById('email').value;
    */

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

            fetch('ws/modificarUsuario.php?id=')
            .then(resp => resp.json())
            .then(response => {
                console.log(response.data);

                Swal.fire(
                    'Confirmado!',
                    'Tu usuario ha sido modificado.',
                    'success'
                )

                let tabla = document.getElementById('table');
                let filas = tabla.getElementsByTagName('tr');
            
                for (let i=0; i<=filas.length; i++) {
                    if (fila[i] === fila) {
                        fila = 
                            "<td><input type='button' id='borrar' value='Borrar'>" +
                                "<input type='button' id='modificar' value='Modificar'></td>" +
                            "<td>" + cellNombre + "</td>" +
                            "<td>" + cellApellidos + "</td>" +
                            "<td>" + cellSexo + "</td>" +
                            "<td>" + cellTelefono + "</td>" +
                            "<td>" + cellEmail + "</td>"
                    }
                }
            })

        } else {
            Swal.fire(
                'Cancelado!',
                'Has cancelado la operación.',
                'error'
            )
        }
    }).catch(error => console.log('error', error));
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


