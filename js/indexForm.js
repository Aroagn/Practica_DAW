
let formulario = document.getElementById('form');

formulario.addEventListener('submit', function(e)  {
    e.preventDefault();

    let data =  new FormData(formulario);

    Swal.fire({
        title: 'Vas a crear un usuario',
        text: "¿Quieres continuar?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#48B0D5',
        cancelButtonColor: '#d33', 
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'

    }).then((resultado) => {

        if (resultado.isConfirmed) {

            fetch('ws/crearUsuario2.php?id=', {
                method: 'POST',
                body: data
            })

            .then(resp => resp.json())

            Swal.fire(
                'Confirmado!',
                'Tu usuario ha sido creado.',
                'success'
            )

            window.location.href = "P5_Tabla.html";
        
        } else {
            Swal.fire(
                'Cancelado!',
                'Has cancelado la operación.',
                'error'
            )
        }
    }).catch(error => console.log('error', error));
})
