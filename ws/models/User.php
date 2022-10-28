<?php

require_once "crearUsuario.php";
require_once "interfaces/IToJson.php";

class User implements IToJson{

    // Atributos
    private $nombre;
    private $apellidos;
    private $sexo;
    private $telefono;
    private $email;
    private $password;
    private $idea;
    private $foto;

    // Constructor
    public function __construct($suNombre, $susApellidos, $suSexo, $suTelefono, $suEmail, 
        $suPassword, $suIdea, $suFoto){
        
        $this->nombre = $suNombre;
        $this->apellidos = $susApellidos;
        $this->sexo = $suSexo;
        $this->telefono = $suTelefono;
        $this->email = $suEmail;
        $this->password = $suPassword;
        $this->idea = $suIdea;
        $this->foto = $suFoto;
    }

    // Getters y Setters
    public function getNombre(){
        return $this->nombre;
    }
    public function setNombre($suNombre){
        return $this->nombre = $suNombre;
    }

    public function getApellidos(){
        return $this->apellidos;
    }
    public function setApellidos($susApellidos){
        return $this->apellidos = $susApellidos;
    }

    public function getSexo(){
        return $this->sexo;
    }
    public function setSexo($suSexo){
        return $this->sexo = $suSexo;
    }

    public function getTelefono(){
        return $this->telefono;
    }
    function setTelefono($suTelefono){
        return $this->telefono = $suTelefono;
    }

    public function getEmail(){
        return $this->email;
    }
    public function setEmail($suEmail){
        return $this->email = $suEmail;
    }

    public function getPassword(){
        return $this->password;
    }
    public function setPassword($suPassword){
        return $this->password = $suPassword;
    }

    public function getIdea(){
        return $this->idea;
    }
    public function setIdea($suIdea){
        return $this->idea = $suIdea;
    }

    public function getFoto(){
        return $this->foto;
    }
    public function setFoto($suFoto){
        return $this->foto = $suFoto;
    }

    // Método toJSON
    public function toJSON(){
        $mostrarDatos = array(
            "nombre" => $this->nombre,
            "apellidos" => $this->apellidos,
            "sexo" => $this->sexo,
            "telefono" => $this->telefono,
            "email" => $this->email,
            "password" => $this->password,
            "idea" => $this->idea,
            "foto" => $this->foto["name"]
        );
        
        $miJson = json_encode($mostrarDatos, JSON_UNESCAPED_UNICODE);
        return $miJson;
    }

}