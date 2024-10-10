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

$usuario = new Usuario($db);

$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));

switch($request_method) {
    case 'POST':
        // Verifica que todos los campos requeridos no estén vacíos
        if (!empty($data->nombres) &&
            !empty($data->primer_apellido) &&
            !empty($data->segundo_apellido) &&
            !empty($data->telefono) &&
            !empty($data->correo) &&
            !empty($data->direccion) &&
            !empty($data->fecha_nacimiento) &&
            !empty($data->genero) &&
            !empty($data->usuario) &&
            !empty($data->contrasena) &&
            !empty($data->id_rol)) {
            
            // Asigna los datos a las propiedades del objeto usuario
            $usuario->nombres = $data->nombres;
            $usuario->primer_apellido = $data->primer_apellido;
            $usuario->segundo_apellido = $data->segundo_apellido;
            $usuario->telefono = $data->telefono;
            $usuario->correo = $data->correo;
            $usuario->direccion = $data->direccion;
            $usuario->fecha_nacimiento = $data->fecha_nacimiento;
            $usuario->genero = $data->genero;
            $usuario->estado = isset($data->estado) ? $data->estado : true;
            $usuario->usuario = $data->usuario;
            $usuario->contrasena = password_hash($data->contrasena, PASSWORD_DEFAULT); // Asegúrate de encriptar la contraseña
            $usuario->rol_id = $data->id_rol;
    
            // Intenta crear el usuario en la base de datos
            if ($usuario->create()) {
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
            $usuario->readOne();
            if ($usuario->correo) {
                echo json_encode(array(
                    "id" => $usuario->id,
                    "correo" => $usuario->correo,
                    "rol_id" => $usuario->rol_id,
                    "departamento_id" => $usuario->departamento_id,
                    "token_recuperacion" => $usuario->token_recuperacion,
                    "fecha_expiracion_token" => $usuario->fecha_expiracion_token,
                    "activo" => $usuario->activo,
                    "fecha_creacion" => $usuario->fecha_creacion
                ));
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Usuario no encontrado."));
            }
        } else {
            $stmt = $usuario->readAll();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $usuarios_arr = array();
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $usuario_item = array(
                        "id" => $id,
                        "correo" => $correo,
                        "rol_id" => $rol_id,
                        "departamento_id" => $departamento_id,
                        "token_recuperacion" => $token_recuperacion,
                        "fecha_expiracion_token" => $fecha_expiracion_token,
                        "activo" => $activo,
                        "fecha_creacion" => $fecha_creacion
                    );
                    array_push($usuarios_arr, $usuario_item);
                }
                echo json_encode(array("records" => $usuarios_arr));
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontraron usuarios."));
            }
        }
        break;

    case 'PUT':
        if (!empty($data->id)) {
            $usuario->id = $data->id;
            $usuario->correo = $data->correo;
            $usuario->rol_id = $data->rol_id;
            $usuario->departamento_id = $data->departamento_id;
            $usuario->token_recuperacion = $data->token_recuperacion;
            $usuario->fecha_expiracion_token = $data->fecha_expiracion_token;
            $usuario->activo = $data->activo;

            if ($usuario->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Usuario actualizado correctamente."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo actualizar el usuario."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos."));
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $usuario->id = $_GET['id'];
            if ($usuario->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Usuario eliminado correctamente."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo eliminar el usuario."));
            }
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
