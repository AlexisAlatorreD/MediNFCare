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
        // Check if the user and password fields are not empty
        if (!empty($data->usuario) && !empty($data->contrasena)) {
            $login->usuario = $data->usuario;
            $login->contrasena = $data->contrasena;
    
            $result = $login->login();
            
            
            if ($result === 0) {
                // If there's already an active session
                http_response_code(409); // Conflict status
                echo json_encode(array("message" => "Ya hay una sesión activa"));
            } elseif ($result) {
                // Successful login
                http_response_code(200); // OK status
                echo json_encode(array(
                    "message" => "Sesión iniciada", 
                    "token" => $result["token"], 
                    "rol" => $result["rol"]
                ));
            } else {
                // Incorrect credentials
                http_response_code(401); // Unauthorized status
                echo json_encode(array("message" => "Credenciales incorrectas."));
            }
        } else {
            // Missing fields
            http_response_code(400); // Bad request status
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
            if (isset($_GET['t'])) {
                $token = $_GET['t'];
        
                if (!empty($token)) {
                    $login->token = $token;
        
                    // Verificar el token en la base de datos
                    if ($login->verifyToken()) {
                        // Aquí puedes realizar la lógica para eliminar el token o cerrar sesión
        
                        http_response_code(200); // OK status
                        echo json_encode(array("message" => "Token existente"));
                    } else {
                        http_response_code(403); // Forbidden status
                        echo json_encode(array("message" => "Token inválido."));
                    }
                } else {
                    http_response_code(400); // Bad Request status
                    echo json_encode(array("message" => "No hay token proporcionado."));
                }
            } else {
                http_response_code(400); // Bad Request status
                echo json_encode(array("message" => "No se proporcionó el token del usuario."));
            }
            break;
        

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
