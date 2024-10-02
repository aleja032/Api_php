<?php
include_once '../config/database.php';
include_once '../models/User.php';

class UserController {
    private $db;
    private $user;

    public function __construct() {
        $this->db = new mysqli("localhost", "root", "", "prueba_api");
        $this->user = new User($this->db);
    }

    public function checkUser($correo) {
        $this->user->correo = $correo;
        if ($this->user->userExists()) {
            echo json_encode(["message" => "Usuario encontrado"]);
        } else {
            echo json_encode(["message" => "Usuario no encontrado"]);
        }
    }

    public function addUser($nombre, $correo, $pass) {
        $this->user->nombre = $nombre;
        $this->user->correo = $correo;
        $this->user->pass = password_hash($pass, PASSWORD_DEFAULT); // Hashear la contraseña
        if ($this->user->createUser()) {
            echo json_encode(["message" => "Usuario agregado"]);
        } else {
            echo json_encode(["message" => "Error al agregar usuario"]);
        }
    }

    public function getUsers(){
        $users = $this->user->getUsers();
        if (!empty($users)) {
            echo json_encode($users);
        } else {
            echo json_encode(["message" => "No users found"]);
        }
    }
    
}
?>
