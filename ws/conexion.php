<?php

class Conexion {

    private $db_host;
    private $db_user;
    private $db_pass;
    private $db_name;
    
    protected $db_conexion;
	
	public function __construct($db_host, $db_user, $db_pass, $db_name){

		try {
			$this->db_host = $db_host;
			$this->db_user = $db_user;
			$this->db_pass = $db_pass;
            $this->db_name = $db_name;

            $dsn = 'mysql:host=' . $db_host . ';dbname=' . $db_name . ';';

            $this->db_conexion = new PDO(
                $dsn, 
                $db_user, 
                $db_pass,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        
			return $this->db_conexion;
			
        } catch(Exception $e) {
            return null;
        }
    }

    public function query($id) {
        try {
            $consulta_query = $this->db_conexion->query("SELECT * FROM alumno WHERE id = $id");
            $resultado = $consulta_query->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $ex) {
            return null;
        }
    
        return $resultado;
    }

}


?>