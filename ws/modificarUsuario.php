<?php

header('Content-Type: application/json; charset=utf-8');

require_once "conexion.php";

$id = $_GET['id'] ?? null;

$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$sexo = $_POST['sexo'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$password = $_POST['password'];

class ModifyUser extends Conexion {

    public function __construct($db_host, $db_user, $db_pass, $db_name){	
		parent::__construct($db_host, $db_user, $db_pass, $db_name); 
    }

    public function modifyUser($id, $nombre, $apellidos, $sexo, $telefono, $email, $password) {

        if(!empty($nombre)){
            $sql = "UPDATE alumno SET nombre='$nombre' WHERE id='$id'";
            $consulta = $this->db_conexion->query($sql);
        }

        if(!empty($apellidos)){
            $sql = "UPDATE alumno SET apellidos='$apellidos' WHERE id='$id'";
            $consulta = $this->db_conexion->query($sql);
        }

        if(!empty($sexo)){
            $sql = "UPDATE alumno SET sexo='$sexo' WHERE id='$id'";
            $consulta = $this->db_conexion->query($sql);
        }

        if(!empty($telefono)){
            $sql = "UPDATE alumno SET telefono='$telefono' WHERE id='$id'";
            $consulta = $this->db_conexion->query($sql);
        }

        if(!empty($email)){
            $sql = "UPDATE alumno SET email='$email' WHERE id='$id'";
            $consulta = $this->db_conexion->query($sql);
        }
        
        if(!empty($password)){
            $sql = "UPDATE alumno SET password='$password' WHERE id='$id'";
            $consulta = $this->db_conexion->query($sql);
        }
        
        $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);        
        return $resultado;
    }
}

$usuario = new ModifyUser ('localhost', 'root', '', 'colegio');  
$array_user = $usuario->modifyUser($id, $nombre, $apellidos, $sexo, $telefono, $email, $password);

$conexion = new Conexion('localhost', 'root', '', 'colegio');
$query = $conexion->query($id);

if (isset($id)){
    $array_user;

    $usuario->succes = true;
    $usuario->message  = "Usuario modificado correctamente";
    $usuario->data = $query;

    print_r(json_encode($usuario));
}

?>
