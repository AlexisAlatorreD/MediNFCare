<?php
class Usuario {
    private $conn;
    private $table_name = "Usuario";
    private $table_token = "token_sesion";

    public $id;
    public $usuario;
    public $correo;
    public $contrasena;
    public $rol_id;
    public $departamento_id;
    public $token_recuperacion;
    public $fecha_expiracion_token;
    public $activo;
    public $fecha_creacion;

    public $token;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear nuevo usuario
    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                    (correo, contrasena, rol_id, departamento_id, token_recuperacion, fecha_expiracion_token, activo) 
                  VALUES 
                    (:correo, :contrasena, :rol_id, :departamento_id, :token_recuperacion, :fecha_expiracion_token, :activo)";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $this->contrasena = password_hash(htmlspecialchars(strip_tags($this->contrasena)), PASSWORD_DEFAULT);
        $this->rol_id = htmlspecialchars(strip_tags($this->rol_id));
        $this->departamento_id = htmlspecialchars(strip_tags($this->departamento_id));
        $this->token_recuperacion = htmlspecialchars(strip_tags($this->token_recuperacion));
        
        // Manejo de fecha de expiración del token
        if (empty($this->fecha_expiracion_token)) {
            $this->fecha_expiracion_token = null;
        } else {
            $this->fecha_expiracion_token = date('Y-m-d H:i:s', strtotime($this->fecha_expiracion_token));
        }
        
        $this->activo = htmlspecialchars(strip_tags($this->activo));

        // Enlace de parámetros
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":contrasena", $this->contrasena);
        $stmt->bindParam(":rol_id", $this->rol_id);
        $stmt->bindParam(":departamento_id", $this->departamento_id);
        $stmt->bindParam(":token_recuperacion", $this->token_recuperacion);
        $stmt->bindParam(":fecha_expiracion_token", $this->fecha_expiracion_token);
        $stmt->bindParam(":activo", $this->activo);

        // Ejecutar
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Leer todos los usuarios
    function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY fecha_creacion DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Leer un solo usuario por ID
    function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->correo = $row['correo'];
            $this->rol_id = $row['rol_id'];
            $this->departamento_id = $row['departamento_id'];
            $this->token_recuperacion = $row['token_recuperacion'];
            $this->fecha_expiracion_token = $row['fecha_expiracion_token'];
            $this->activo = $row['activo'];
            $this->fecha_creacion = $row['fecha_creacion'];
        }
    }

    // Actualizar usuario
    function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET 
                    correo = :correo, 
                    rol_id = :rol_id, 
                    departamento_id = :departamento_id, 
                    token_recuperacion = :token_recuperacion, 
                    fecha_expiracion_token = :fecha_expiracion_token, 
                    activo = :activo 
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $this->rol_id = htmlspecialchars(strip_tags($this->rol_id));
        $this->departamento_id = htmlspecialchars(strip_tags($this->departamento_id));
        $this->token_recuperacion = htmlspecialchars(strip_tags($this->token_recuperacion));
        $this->fecha_expiracion_token = htmlspecialchars(strip_tags($this->fecha_expiracion_token));
        $this->activo = htmlspecialchars(strip_tags($this->activo));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Enlace de parámetros
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":rol_id", $this->rol_id);
        $stmt->bindParam(":departamento_id", $this->departamento_id);
        $stmt->bindParam(":token_recuperacion", $this->token_recuperacion);
        $stmt->bindParam(":fecha_expiracion_token", $this->fecha_expiracion_token);
        $stmt->bindParam(":activo", $this->activo);
        $stmt->bindParam(":id", $this->id);

        // Ejecutar
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar usuario
    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Iniciar sesión
    function login($usuario, $contrasena) {
      // Consulta para obtener el usuario asociado al nombre de usuario
      $query = "SELECT u.id, u.usuario, u.id_rol, u.fecha_creacion, p.correo, u.contrasena
                FROM " . $this->table_name . " u 
                INNER JOIN persona p ON u.id_persona = p.id 
                WHERE u.usuario = :usuario";
  
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":usuario", $usuario);
      $stmt->execute();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
  
      // Verificación de las credenciales
      if ($row && password_verify($contrasena, $row['contrasena'])) {
          // Asignación de valores a las propiedades del objeto
          $this->id = $row['id'];
          $this->usuario = $row['usuario'];
          $this->rol_id = $row['id_rol'];
          $this->fecha_creacion = $row['fecha_creacion'];
          $this->correo = $row['correo'];  // Asegúrate de asignar el correo aquí
  
          return true;
      }
  
      return false;
  }
  

    // Crear token de sesión
    function create_token_sesion($correo, $token) {
        $query = "INSERT INTO " . $this->table_token . " 
                    (correo, token) 
                  VALUES 
                    (:correo, :token)";
        $stmt = $this->conn->prepare($query);

        $this->correo = htmlspecialchars(strip_tags($correo));
        $this->token = htmlspecialchars(strip_tags($token));

        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":token", $token);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Verificar si el token existe
    function VerifyTokenExist($token) {
        $query = "SELECT * FROM " . $this->table_token . " WHERE token = :token";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":token", $token);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) ? true : false;
    }

    // Eliminar token de sesión
    function delete_token_sesion($token) {
        $query = "DELETE FROM " . $this->table_token . " WHERE token = :token";
        $stmt = $this->conn->prepare($query);

        $this->token = htmlspecialchars(strip_tags($this->token));
        $stmt->bindParam(':token', $token);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Generar token de recuperación
    function generateRecoveryToken() {
        $token = bin2hex(random_bytes(16));
        $this->token_recuperacion = $token;
        $this->fecha_expiracion_token = date('Y-m-d H:i:s', strtotime('+1 day')); // Token válido por 1 día
        return $token;
    }

}
?>
