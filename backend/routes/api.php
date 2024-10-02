<?php
include_once '../controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$request_method = $_SERVER["REQUEST_METHOD"];
$userController = new UserController();

switch($request_method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['action']) && isset($data['email'])) {
            if ($data['action'] == 'check') {
                $userController->checkUser($data['email']);
            } elseif ($data['action'] == 'add') {
                if (isset($data['nombre'], $data['correo'], $data['pass'])) {
                    $userController->addUser($data['nombre'], $data['correo'], $data['pass']);
                } else {
                    echo json_encode(["message" => "Faltan datos para agregar el usuario"]);
                }
            } else {
                echo json_encode(["message" => "Acción no válida"]);
            }
        } else {
            echo json_encode(["message" => "Datos incompletos"]);
        }
        break;

    case 'GET':  // Añadir este caso para obtener los usuarios
        $userController->getUsers();  // Llamar al método para obtener usuarios
        break;

    default:
        echo json_encode(["message" => "Método no permitido"]);
        break;
}

?>
