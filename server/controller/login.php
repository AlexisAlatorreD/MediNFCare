<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$root = dirname(__DIR__);  // Obtiene el directorio raíz del proyecto

include_once $root . '/config/database.php';
include_once $root . '/models/Login.php';

$database = new Database();
$db = $database->getConnection();

$login = new Login($db);

$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));

switch ($request_method) {
    case 'POST':
        if (!empty($data->usuario) && !empty($data->contrasena)) {
            $login->usuario = $data->usuario;
            $login->contrasena = $data->contrasena;
    
            $result = $login->login();
            
            if ($result) {
                http_response_code(200);
                echo json_encode(array("message" => "Sesión iniciada", "token" => $result));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Credenciales incorrectas."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos."));
        }
        break;

    case 'GET':
        if (isset($_GET['id'])) {
            // Lógica para manejar solicitudes GET con ID
        } else {
            echo json_encode(array("message" => "FUNCIONANDO"));
        }
        break;

    case 'PUT':
        if (!empty($data->id)) {
            // Lógica para manejar solicitudes PUT con ID
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos."));
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            echo json_encode(array("message" => "ID OBTENIDO"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No se proporcionó el ID del usuario."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
