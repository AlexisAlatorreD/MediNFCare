<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$root = dirname(__DIR__);  // Obtiene el directorio raíz del proyecto

include_once $root . '/config/database.php';
include_once $root . '/models/Usuario.php';

$database = new Database();
$db = $database->getConnection();

$login = new Usuario($db);

$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));

// Definimos los campos requeridos
$required_fields = ['nombres', 'primer_apellido', 'segundo_apellido', 'telefono', 'correo', 'direccion', 'fecha_nacimiento', 'estado', 'genero'];

switch($request_method) {
    case 'POST':
        // Comprobamos que los campos requeridos no estén vacíos
        $missing_fields = array_filter($required_fields, function($field) use ($data) {
            return empty($data->$field);
        });

        if (empty($missing_fields)) {
            // Asignamos los valores del cuerpo de la solicitud
            $login->nombres = $data->nombres;
            $login->primer_apellido = $data->primer_apellido;
            $login->segundo_apellido = isset($data->segundo_apellido) ? $data->segundo_apellido : null;
            $login->telefono = $data->telefono;
            $login->direccion = $data->direccion;
            $login->fecha_nacimiento = $data->fecha_nacimiento;
            $login->genero = $data->genero;
            $login->estado = isset($data->estado) ? $data->estado : 1; // Por defecto, activo

            if ($login->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Usuario creado correctamente."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el usuario."));
            }
        } else {
            // Faltan campos, devolvemos un error
            http_response_code(400);
            echo json_encode(array(
                "message" => "Datos incompletos.",
                "missing_fields" => $missing_fields  // Indicamos los campos que faltan
            ));
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
