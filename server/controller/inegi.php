<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Token de autenticación proporcionado por el servicio de la API
$token = 'dec70686-034d-41d0-9125-4c41aad3db15'; // Reemplaza con tu token
$codigo_postal = '63660'; // Código postal a buscar

// URL de la API que devuelve los datos de estado, municipio y localidad de México
$url = "https://api-sepomex.hckdrk.mx/query/info_cp/$codigo_postal?type=simplified";

// Inicializa cURL
$curl = curl_init($url);

// Configura las opciones de cURL
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer $token", // Agrega el token a la cabecera
));

// Ejecuta la petición y obtiene la respuesta
$response = curl_exec($curl);

// Verifica si hay errores en la petición
if (curl_errno($curl)) {
    echo 'Error:' . curl_error($curl);
}

// Cierra cURL
curl_close($curl);

// Decodifica la respuesta JSON
$data = json_decode($response, true);

// Verifica si la respuesta contiene datos válidos
if (isset($data['response'])) {
    $estado = $data['response']['estado'];
    $municipio = $data['response']['municipio'];
    $localidad = $data['response']['ciudad'];

    echo "Estado: $estado\n";
    echo "Municipio: $municipio\n";
    echo "Localidad: $localidad\n";
} else {
    echo json_encode(["error" => "No se encontraron datos para este codigo postal.{$codigo_postal}"]);
}

?>
