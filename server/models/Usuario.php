<?php
class Usuario {
    private $conn;
    private $table_name = "Usuario";
    private $table_persona = "Persona";
    private $table_token = "token_sesion";

    public $id;
    public $nombres; // Agregado
    public $primer_apellido; // Agregado
    public $segundo_apellido; // Agregado
    public $telefono; // Agregado
    public $correo;
    public $direccion; // Agregado
    public $fecha_nacimiento; // Agregado
    public $genero; // Agregado
    public $estado; // Agregado
    public $usuario;
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
        // Consulta SQL para insertar un nuevo usuario
        $query = "INSERT INTO " . $this->table_persona . " 
                    (nombres, primer_apellido, segundo_apellido, telefono, correo, direccion, 
                    fecha_nacimiento, genero, estado) 
                  VALUES 
                    (:nombres, :primer_apellido, :segundo_apellido, :telefono, :correo, :direccion, 
                    :fecha_nacimiento, :genero, :estado)";
        $stmt = $this->conn->prepare($query);
    
        // Sanitizar datos
        $this->nombres = htmlspecialchars(strip_tags($this->nombres));
        $this->primer_apellido = htmlspecialchars(strip_tags($this->primer_apellido));
        $this->segundo_apellido = htmlspecialchars(strip_tags($this->segundo_apellido));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->fecha_nacimiento = htmlspecialchars(strip_tags($this->fecha_nacimiento));
        $this->genero = htmlspecialchars(strip_tags($this->genero));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
    
        // Enlace de parámetros
        $stmt->bindParam(":nombres", $this->nombres);
        $stmt->bindParam(":primer_apellido", $this->primer_apellido);
        $stmt->bindParam(":segundo_apellido", $this->segundo_apellido);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":fecha_nacimiento", $this->fecha_nacimiento);
        $stmt->bindParam(":genero", $this->genero);
        $stmt->bindParam(":estado", $this->estado);
    
        // Ejecutar
        if ($stmt->execute()) {
            $lastInsertedId = $this->conn->lastInsertId();

        // Consulta SQL para insertar en la tabla usuario
        $queryUsuario = "INSERT INTO usuario (usuario, contrasena, id_rol, id_persona, estado) 
                         VALUES (:usuario, :contrasena, :id_rol, :id_persona, :estado)";

        $stmtUsuario = $this->conn->prepare($queryUsuario);

        // Enlace de parámetros para usuario
        $stmtUsuario->bindParam(":usuario", $this->usuario);
        $stmtUsuario->bindParam(":contrasena", $this->contrasena); // Ya está hasheada
        $stmtUsuario->bindParam(":id_rol", $this->rol_id);
        $stmtUsuario->bindParam(":id_persona", $lastInsertedId); // Usar el ID de persona
        $stmtUsuario->bindParam(":estado", $this->estado);

        // Ejecutar inserción en la tabla usuario
        if ($stmtUsuario->execute()) {
            return true;
        }
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
    
    function delete_token_sesion($token) {
        // Primero busca el hash almacenado
        $query = "SELECT token FROM " . $this->table_token . " LIMIT 1"; // Ajusta la lógica
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($result && password_verify($token, $result['token'])) {
            // Si coincide, entonces elimina usando el hash almacenado
            $query_delete = "DELETE FROM " . $this->table_token . " WHERE token = :hash";
            $stmt_delete = $this->conn->prepare($query_delete);
            $stmt_delete->bindParam(':hash', $result['token']);
            
            return $stmt_delete->execute();
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
