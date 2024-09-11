<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Tu clave API del INEGI
$apiKey = "84bb354c-4a26-4b01-9d35-8cada05e58aa";

// Código postal que quieres consultar
$codigoPostal = "63660";  // Aquí colocas el código postal

// URL de la API del INEGI (asegúrate de usar la URL correcta de la API)
$url = "https://www.inegi.org.mx/app/api/denue/v1/consulta/Buscar/CP/63660/84bb354c-4a26-4b01-9d35-8cada05e58aa";

// Hacemos la solicitud a la API usando file_get_contents
$response = file_get_contents($url);

// Verificamos que haya una respuesta válida
if ($response === false) {
    echo json_encode(["error" => "No se pudo conectar con la API del INEGI."]);
    exit;
}

// Decodificamos el JSON de la respuesta
$data = json_decode($response, true);

// Verificamos si los datos se decodificaron correctamente
if (isset($data)) {
    // Extraemos el estado, municipio y localidad
    foreach ($data as $item) {
        $estado = $item['estado'] ?? 'No disponible';
        $municipio = $item['municipio'] ?? 'No disponible';
        $localidad = $item['localidad'] ?? 'No disponible';

        // Mostramos la información
        echo json_encode([
            "estado" => $estado,
            "municipio" => $municipio,
            "localidad" => $localidad
        ]);
    }
} else {
    echo json_encode(["error" => "No se encontraron datos para este código postal."]);
}
?>
