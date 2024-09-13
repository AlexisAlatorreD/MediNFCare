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

switch($request_method) {
    case 'POST':
        if (!empty($data->correo) && !empty($data->contrasena)) {
            $login->correo = $data->correo;
            $login->contrasena = $data->contrasena;
            $login->rol_id = isset($data->rol_id) ? $data->rol_id : null;
            $login->departamento_id = isset($data->departamento_id) ? $data->departamento_id : null;
            $login->token_recuperacion = isset($data->token_recuperacion) ? $data->token_recuperacion : null;
            $login->fecha_expiracion_token = isset($data->fecha_expiracion_token) ? $data->fecha_expiracion_token : null;
            $login->activo = isset($data->activo) ? $data->activo : true;

            if ($login->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Usuario creado correctamente."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el usuario."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos."));
        }
        break;

    case 'GET':
        if (isset($_GET['id'])) {
            $usuario->id = $_GET['id'];
            
        }else{
            echo json_encode(array("message" => "FUNCIONANDO"));
        }
        break;

    case 'PUT':
        if (!empty($data->id)) {
            
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
