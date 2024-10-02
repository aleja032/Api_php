<?php
class User {
    private $conn;
    private $table = 'users';

    public $id;
    public $name;
    public $email;
    public $pass;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function userExists() {
        $query = "SELECT id FROM " . $this->table . " WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('s', $this->correo);
        $stmt->execute();
        $stmt->store_result();

        return $stmt->num_rows > 0;
    }

    public function createUser() {
        $query = "INSERT INTO " . $this->table . " (name, email, pass) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('sss', $this->name, $this->email, $this->pass);
        return $stmt->execute();
    }
    
    public function getUsers(){
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result(); // Obtiene el resultado de la consulta
    
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row; // Agrega cada fila al array de usuarios
        }
        return $users; // Retorna el array de usuarios
    }
    
}
?>
