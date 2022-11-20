
window.onload = () => {

    // Abrimos la URL de la barra del navegador
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html');

    // Qué hacer en cada caso al obtener la respuesta del servidor
    xhr.onreadystatechange = () => {
        // Si la petición no está enviada
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        // Si la petición está ok
        if (xhr.status === 200) {
            const header = document.getElementById('header');
            header.innerHTML = xhr.responseText;
            colorURL();
            return;
        }
        
        alert('ERROR EN LA PETICIÓN');
    }

    function colorURL() {
        let URLactual = window.location.href;
        let enlace = document.getElementsByClassName('enlace');

        for(let i=0; i<=enlace.length; i++) {
                
            if (URLactual == enlace[i]){
                enlace[i].style.backgroundColor = 'rgba(61, 182, 226, 0.850)';
            }
        }
    }

    // Enviamos la petición
    xhr.send();
}
