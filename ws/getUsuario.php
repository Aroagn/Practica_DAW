<?php

require_once "conexion.php";

$id = $_GET['id'] ?? null;

class ConsultUser extends Conexion {
	
	public function __construct($db_host, $db_user, $db_pass, $db_name){	
		parent::__construct($db_host, $db_user, $db_pass, $db_name); 
    }

    public function get_alumno($id) {
    
        try {
            $sql = 'SELECT * FROM alumno';

            if ($id !== null) {
                $sql .= " WHERE id LIKE :id";
            }

            $id = "%$id%";
            $consulta = $this->db_conexion->prepare($sql);

            if ($id !== null) {
                $consulta->bindParam(':id', $id, PDO::PARAM_STR);   
            }

            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultado;

        } catch (PDOException $ex) {
            return null;
        }
    }
}

$alumno = new ConsultUser('localhost', 'root', '', 'colegio');
$array_alumno = $alumno->get_alumno($id);

if (!empty($array_alumno)) {
    $alumno->succes = true;
    $alumno->message  = "Usuario obtenido correctamente";
    $alumno->data = $array_alumno;
} else {
    $alumno->succes = false;
    $alumno->message  = "Usuario con id $id no encontrado";
    $alumno->data = null;
}

print_r(json_encode($alumno));

?>
