<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$root = dirname(__DIR__);  // Obtiene el directorio raíz del proyecto

include_once $root . '/config/database.php';
include_once $root . '/models/Usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

// Verificar si el token existe
if (!empty($data->token)) {
    // Obtener el token desencriptado del cliente
    $usuario->token = $data->token;

    if (isset($usuario->token)) {

            $token_insertado = $usuario->delete_token_sesion($usuario->token);
            
            http_response_code(200);
            echo json_encode(array(
                "message" => "Se cerró la sesión correctamente"
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "El token no existe o no coincide"));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "No se encuentra el token en la base de datos"));
}

?>
