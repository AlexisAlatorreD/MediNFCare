<?php
class Usuario {
    private $conn;
    private $table_name = "persona";

    public $id;
    public $nombres;
    public $primer_apellido;
    public $segundo_apellido;
    public $telefono;
    public $correo;
    public $direccion;
    public $fecha_nacimiento;
    public $genero;
    public $estado;
    public $fecha_creacion;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                    (nombres, primer_apellido, segundo_apellido, telefono, correo, direccion, fecha_nacimiento, genero, estado) 
                  VALUES 
                    (:nombres, :primer_apellido, :segundo_apellido, :telefono, :correo, :direccion, :fecha_nacimiento, :genero, :estado)";
        $stmt = $this->conn->prepare($query);
        
        $this->sanitize();

        // Asignación de parámetros a la sentencia preparada
        $stmt->bindParam(":nombres", $this->nombres);
        $stmt->bindParam(":primer_apellido", $this->primer_apellido);
        $stmt->bindParam(":segundo_apellido", $this->segundo_apellido);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":fecha_nacimiento", $this->fecha_nacimiento);
        $stmt->bindParam(":genero", $this->genero);
        $stmt->bindParam(":estado", $this->estado);
    
        // Ejecución de la consulta
        if ($stmt->execute()) {
            return true;
        }
    
        return false;
    }


    private function sanitize()
  {
    // Limpieza y asignación de variables
    $this->nombres = $this->nombres ? htmlspecialchars(strip_tags($this->nombres)): null;
    $this->primer_apellido = $this->primer_apellido ?  htmlspecialchars(strip_tags($this->primer_apellido)): null;
    $this->segundo_apellido = $this->segundo_apellido ? htmlspecialchars(strip_tags($this->segundo_apellido)): null;
    $this->telefono =  $this->telefono ? htmlspecialchars(strip_tags($this->telefono)): null;
    $this->correo =  $this->correo ? htmlspecialchars(strip_tags($this->correo)): null;
    $this->direccion =  $this->direccion ? htmlspecialchars(strip_tags($this->direccion)): null;
    $this->fecha_nacimiento =  $this->fecha_nacimiento ? htmlspecialchars(strip_tags($this->fecha_nacimiento)): null;
    $this->genero =  $this->genero ? htmlspecialchars(strip_tags($this->genero)): null;
    $this->estado =  $this->estado ? htmlspecialchars(strip_tags($this->estado)): null;

  }
}
?>
