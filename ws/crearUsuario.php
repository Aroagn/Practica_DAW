<?php
/*
header('Content-Type: application/json; charset=utf-8');

require_once 'models/user.php';

$nombre = $_POST['nombre'] ?? null;
$apellidos = $_POST['apellidos'] ?? null;
$sexo = $_POST['sexo'] ?? null;
$telefono = $_POST['telefono'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

//Almacenamos los datos del usuario en un archivo de texto, sin sobreescribir el contenido de ese fichero
$archivoDatos = "datosUsuarios.txt";

$datos = array(
    "Nombre: " . $nombre . PHP_EOL,
    "Apellidos: " . $apellidos . PHP_EOL,
    "Sexo: " . $sexo . PHP_EOL,
    "Teléfono: " . $telefono . PHP_EOL,
    "Email: " . $email . PHP_EOL,
    "Contraseña: " . $password . PHP_EOL . PHP_EOL
    //"Idea viaje: " . $idea . PHP_EOL,
    //"Foto: " . $foto["name"] . PHP_EOL . PHP_EOL
);

file_put_contents($archivoDatos, $datos, FILE_APPEND);

// Mostramos por pantalla la información del usuario en formato JSON
$usuario = new User ($nombre, $apellidos, $sexo, $telefono, $email, $password);
echo $usuario->toJSON();     
*/
?>

