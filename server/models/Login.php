<?php
class Login {
    private $conn;
    private $table_usuario = "usuario";
    private $table_token = "token_sesion";
    private $table_rol = "rol";

    public $usuario;
    public $correo;
    public $contrasena;
    public $rol;
    public $token;

    public function __construct($db) {
        $this->conn = $db;
    }

// Verifica el token encriptado
public function verifyToken() {
    $query = "SELECT token, correo
              FROM " . $this->table_token . "
              WHERE correo = :correo";  // O puedes usar otro campo que sea relevante para buscar el token
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":correo", $this->correo);  // Asegúrate de pasar el correo u otro identificador relevante
    $stmt->execute();
    
    // Si el correo o identificador existe en la base de datos
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $hashedToken = $row['token'];  // El token almacenado encriptado

        // Verifica que el token proporcionado coincida con el token encriptado en la base de datos
        if (password_verify($this->token, $hashedToken)) {
            return true; 
        } else {
            return false; 
        }
    } else {
        return false;
    }
}



    // Verifica las credenciales
    public function verifyCredentials() {
        $query = "SELECT p.correo, u.contrasena
                  FROM " . $this->table_usuario . " u
                  INNER JOIN persona p ON u.id_persona = p.id
                  WHERE u.usuario = :usuario
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario", $this->usuario);
        $stmt->execute();
                    
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->correo = $row['correo'];
            
            if (password_verify($this->contrasena, $row['contrasena'])) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // Verifica si ya existe un token activo para el correo
    private function checkActiveSession() {
        $query = "SELECT token FROM " . $this->table_token . " WHERE correo = :correo LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return true; // Ya existe una sesión activa
        } else {
            return false; // No hay sesión activa
        }
    }

    // Obtener el rol del usuario
    private function getRole() {
        $query = "SELECT r.nombre_rol AS rol
                  FROM " . $this->table_rol . " r
                  INNER JOIN " . $this->table_usuario . " u ON u.id_rol = r.id
                  WHERE u.usuario = :usuario
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario", $this->usuario);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['rol'];
        } else {
            return null;
        }
    }

    // Genera un token único
    private function generateToken() {
        return bin2hex(random_bytes(16)); 
    }

    // Inserta el token en la base de datos
    private function insertToken($token) {
        $query = "INSERT INTO " . $this->table_token . " (correo, token) VALUES (:correo, :token)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":token", $token);
        return $stmt->execute();
    }

    function login() {
        if ($this->verifyCredentials()) {
            if ($this->checkActiveSession()) {
                return 0; // Ya hay una sesión activa
            } else {
                // Obtener el rol del usuario
                $this->rol = $this->getRole();

                if ($this->rol) {
                    $token = $this->generateToken();
                    if ($this->insertToken($token)) {
                        return array("token" => $token, "rol" => $this->rol);
                    } else {
                        return false; // No se pudo insertar el token
                    }
                } else {
                    return false; // No se pudo obtener el rol
                }
            }
        } else {
            return false; // Credenciales incorrectas
        }
    }
}
