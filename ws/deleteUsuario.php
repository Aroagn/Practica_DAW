<?php

header('Content-Type: application/json; charset=utf-8');

require_once "conexion.php";

$id = $_GET['id'] ?? null;
$conexion = new Conexion('localhost', 'root', '', 'colegio');
$query = $conexion->query($id);

class DeleteUser extends Conexion {

	public function __construct($db_host, $db_user, $db_pass, $db_name) {	
		parent::__construct($db_host, $db_user, $db_pass, $db_name); 
    }

    public function delete_alumno($id) {

        try {
            $sql = "DELETE FROM alumno WHERE id = :id";

            $consulta = $this->db_conexion->prepare($sql);

            if ($id !== null) {
                $consulta->bindParam(':id', $id, PDO::PARAM_STR);   
            }
            $consulta->execute();

        } catch (PDOException $ex) {
            return null;
        }
    }
}

$alumno = new DeleteUser('localhost', 'root', '', 'colegio');
$array_alumno = $alumno->delete_alumno($id);

$alumno->succes = true;
$alumno->message  = "Usuario eliminado correctamente";
$alumno->data = $query;


print_r(json_encode($alumno));

?>
