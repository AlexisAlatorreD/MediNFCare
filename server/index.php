<?php
    // Configurar la zona horaria a America/Mazatlan
    date_default_timezone_set('America/Mazatlan');
    
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
      exit(0);
    }
    
    // Definir el directorio base
    $baseDir = dirname(__FILE__);  // Obtiene el directorio actual donde está ubicado el index.php
    
    // Definir las rutas disponibles en la API
    $request_method = $_SERVER["REQUEST_METHOD"];
    $request_uri = $_SERVER['REQUEST_URI'];
    
    switch ($request_method) {
      case 'POST':
      case 'GET':
      case 'PUT':
      case 'DELETE':
        if (strpos($request_uri, '/server/usuario') !== false) {
          include_once $baseDir . '/controller/usuario.php';
        }else if (strpos($request_uri, '/server/login') !== false) {
          include_once $baseDir . '/controller/login.php';
        }else if (strpos($request_uri, '/server/deleteToken') !== false) {
          include_once $baseDir . '/controller/deleteToken.php';
        }else if (strpos($request_uri, '/server/logout') !== false) {
          include_once $baseDir . '/controller/logout.php';
          
        } elseif (strpos($request_uri, '/server/status') !== false) {
          header('Content-Type: application/json');
          echo json_encode(array("message" => "Servidor funcionando correctamente"));
        } else {
          header("HTTP/1.0 404 Not Found");
          echo json_encode(array("message" => "Controlador no encontrado"));
        }
        break;
    
      default:
        header("HTTP/1.0 405 Method Not Allowed");
        echo json_encode(array("message" => "Method not allowed."));
        break;
}

