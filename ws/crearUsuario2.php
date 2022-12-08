<?php

// Elimino los parámetros "idea y foto" para que no hay conflicto con la base de datos del colegio

require_once "conexion.php";

$nombre = $_POST['nombre'] ?? null;
$apellidos = $_POST['apellidos'] ?? null;
$sexo = $_POST['sexo'] ?? null;
$telefono = $_POST['telefono'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

class CreateUser extends Conexion {

	public function __construct($db_host, $db_user, $db_pass, $db_name) {	
		parent::__construct($db_host, $db_user, $db_pass, $db_name); 
    }

    public function createUser($nombre, $apellidos, $sexo, $telefono, $email, $password) {
        try {
            $sql = "INSERT INTO alumno (nombre, apellidos, sexo, telefono, email, password) 
                VALUES (:nombre, :apellidos, :sexo, :telefono, :email, :password)";

            $consulta = $this->db_conexion->prepare($sql);

            if ($nombre !== null) {
                $consulta->bindParam(':nombre', $nombre, PDO::PARAM_STR);
            } 
            if ($apellidos !== null) {
                $consulta->bindParam(':apellidos', $apellidos, PDO::PARAM_STR);
            } 
            if ($sexo !== null) {
                $consulta->bindParam(':sexo', $sexo, PDO::PARAM_STR);
            } 
            if ($telefono !== null) {
                $consulta->bindParam(':telefono', $telefono, PDO::PARAM_STR);
            } 
            if ($email !== null) {
                $consulta->bindParam(':email', $email, PDO::PARAM_STR);
            } 
            if ($password !== null) {
                $consulta->bindParam(':password', $password, PDO::PARAM_STR);
            }

            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;

        } catch (PDOException $ex) {
            return null;
        }
    }
}

$usuario = new CreateUser ('localhost', 'root', '', 'colegio');  
$array_user = $usuario->createUser($nombre, $apellidos, $sexo, $telefono, $email, $password);

if (empty($array_user)) {
    $usuario->succes = true;
    $usuario->message  = "Usuario creado correctamente";

    print_r(json_encode($usuario));
    require_once "interfaces/IToJSON.php";
}

?>