<?php
class Login {
    private $conn;
    private $table_usuario = "usuario";
    private $table_token = "token_sesion";

    public $usuario;
    public $correo;
    public $contrasena;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Verifica las credenciales comparando la contraseña con el hash almacenado
        public function verifyCredentials() {
            $query = "SELECT p.correo, u.contrasena
                       FROM " . $this->table_usuario . " u
                       INNER JOIN persona p ON u.id_persona = p.id
                       WHERE u.usuario = :usuario
                       LIMIT 1";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":usuario", $this->usuario);
            $stmt->execute();
            
            error_log("Buscando usuario: " . $this->usuario);
            
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->correo = $row['correo'];
                
                error_log("Usuario encontrado. Correo: " . $this->correo);
                error_log("Contraseña proporcionada: " . $this->contrasena);
                error_log("Hash almacenado: " . $row['contrasena']);
                
                // Verificar la contraseña con password_verify()
                if (password_verify($this->contrasena, $row['contrasena'])) {
                    error_log("Contraseña verificada correctamente");
                    return true;
                } else {
                    error_log("Contraseña incorrecta");
                    return false;
                }
            } else {
                error_log("Usuario no encontrado.");
                return false;
            }
        }
    
    
    // Genera un token único
    private function generateToken() {
        return bin2hex(random_bytes(16)); // Genera un token de 32 caracteres
    }

    // Inserta el token en la base de datos
    private function insertToken($token) {
        $query = "INSERT INTO " . $this->table_token . " (correo, token) VALUES (:correo, :token)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":token", $token);
        if ($stmt->execute()) {
            return true;
        } else {
            error_log("Error al insertar el token.");
            return false;
        }
    }
    
    // Función principal de login
    public function login() {
        if ($this->verifyCredentials()) {
            $token = $this->generateToken();
            if ($this->insertToken($token)) {
                return $token;
            } else {
                return false; // No se pudo insertar el token
            }
        } else {
            return false; // Credenciales incorrectas
        }
    }
}
?>
