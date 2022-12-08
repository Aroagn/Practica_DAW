<?php

    require_once 'models/user.php';

    // Datos recogidos del formulario
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $sexo = $_POST['sexo'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    //$idea = $_POST['idea'];
    //$foto = $_FILES['foto'];
    //$patch =$_SERVER['DOCUMENT_ROOT'] . '/Practica_AroaGN/ws/imgUsuarios' . '/' . $foto['name'];
    //move_uploaded_file($foto['tmp_name'], $patch);

    //Almacenamos los datos del usuario en un archivo de texto, sin sobreescribir el contenido de ese fichero
    $archivoDatos = "datosUsuarios.txt";

    $datos = array(
        "Nombre: " . $nombre . PHP_EOL,
        "Apellidos: " . $apellidos . PHP_EOL,
        "Sexo: " . $sexo . PHP_EOL,
        "Teléfono: " . $telefono . PHP_EOL,
        "Email: " . $email . PHP_EOL,
        "Contraseña: " . $password . PHP_EOL,
        //"Idea viaje: " . $idea . PHP_EOL,
        //"Foto: " . $foto["name"] . PHP_EOL . PHP_EOL
    );

    file_put_contents($archivoDatos, $datos, FILE_APPEND);

    // Mostramos por pantalla la información del usuario en formato JSON
$usuario = new User ($nombre, $apellidos, $sexo, $telefono, $email, $password/*, $idea, $foto*/);
    echo $usuario->toJSON();     
    
?>

