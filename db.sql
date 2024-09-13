--ANGULAR Y PHP
CREATE TABLE persona (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE,
    direccion TEXT,
    fecha_nacimiento DATE,
    genero VARCHAR(10),
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permiso (
    id SERIAL PRIMARY KEY,
    nombre_permiso VARCHAR(50) UNIQUE NOT NULL,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE rol_permiso(
    id SERIAL PRIMARY KEY,
    id_rol INT REFERENCES rol(id) ON DELETE CASCADE, 
    id_permiso INT REFERENCES permiso(id) ON DELETE CASCADE
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT REFERENCES rol(id) ON DELETE SET NULL,
    id_persona INT REFERENCES persona(id) ON DELETE CASCADE,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE token_sesion (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(50) NOT NULL UNIQUE,
    token VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE paciente (
id SERIAL PRIMARY KEY,
    id_persona INT REFERENCES persona(id) ON DELETE CASCADE,
    contacto_emergencia VARCHAR(100),
    tipo_sangre VARCHAR(10),
    alergias TEXT,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctor (
id SERIAL PRIMARY KEY,
    id_persona INT REFERENCES persona(id) ON DELETE CASCADE,
    especialidad VARCHAR(100),
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enfermera (
id SERIAL PRIMARY KEY,
    id_persona INT REFERENCES persona(id) ON DELETE CASCADE,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certificacion ( 
id SERIAL PRIMARY KEY,
    nombre_certificacion VARCHAR(100) UNIQUE NOT NULL,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE paramedico (
id SERIAL PRIMARY KEY,
    id_persona INT REFERENCES persona(id) ON DELETE CASCADE,
    certificacion TEXT,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cita (
id SERIAL PRIMARY KEY,
    id_paciente INT REFERENCES paciente(id) ON DELETE CASCADE,
    id_doctor INT REFERENCES doctor(id) ON DELETE CASCADE,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    notas TEXT,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historial_medico (
id SERIAL PRIMARY KEY,
    id_paciente INT REFERENCES paciente(id) ON DELETE CASCADE,
    id_doctor INT REFERENCES doctor(id) ON DELETE CASCADE,
    diagnostico TEXT,
    tratamiento TEXT,
    notas TEXT,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicamento (
    id_medicamento SERIAL PRIMARY KEY,
    id_paciente INT REFERENCES paciente(id) ON DELETE CASCADE,
    id_responsable INT REFERENCES persona(id) ON DELETE SET NULL, -- Doctor o enfermera que prescribe el medicamento
    nombre_medicamento VARCHAR(100) NOT NULL,
    dosis INT NOT NULL, -- Número de pastillas por toma
    frecuencia_horas INT NOT NULL, -- Cada cuántas horas debe tomarlo
    duracion_dias INT NOT NULL, -- Por cuántos días debe tomarlo
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_finalizacion TIMESTAMP, -- Fecha estimada de finalización del tratamiento
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notas_paramedico (
id SERIAL PRIMARY KEY,
    id_paciente INT REFERENCES paciente(id) ON DELETE CASCADE,
    id_paramedico INT REFERENCES paramedico(id) ON DELETE CASCADE,
    nota TEXT,
    estado BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pais(
id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE estado(
id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_pais INT REFERENCES pais(id)
);

CREATE TABLE municipio(
id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_localidad INT REFERENCES estado(id)
);

CREATE TABLE localidad(
id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_municipio INT REFERENCES municipio(id)
);

--Asistencia de citas

CREATE OR REPLACE FUNCTION audit_func()
RETURNS TRIGGER AS $$
DECLARE
    tabla VARCHAR(50);
    operacion VARCHAR(10);
    paciente INT;
    responsable INT;
BEGIN
    -- Determinar el nombre de la tabla afectada
    tabla := TG_TABLE_NAME;

    -- Determinar la operación (INSERT, UPDATE, DELETE)
    operacion := TG_OP;

    -- Determinar el ID del paciente involucrado (si aplica)
    IF tabla = 'paciente' THEN
        paciente := NEW.id;
    ELSIF tabla = 'historial_medico' THEN
        paciente := NEW.id_paciente;
    ELSIF tabla = 'medicamento' THEN
        paciente := NEW.id_paciente;
    ELSIF tabla = 'cita' THEN
        paciente := NEW.id_paciente;
    ELSIF tabla = 'usuario' THEN
        paciente := NEW.id_paciente;
    ELSIF tabla = 'doctor' THEN
        paciente := NEW.id_paciente;
    ELSIF tabla = 'enfermera' THEN
        paciente := NEW.id_paciente;
    ELSE
        paciente := NULL; -- Si no es una tabla relacionada con pacientes
    END IF;

    -- Determinar el ID de la persona responsable (esto se debería pasar desde la aplicación)
    responsable := TG_ARGV[0]::INT;

    -- Insertar en la tabla de auditoría
    INSERT INTO historial_audit (operacion, id_persona, tabla_afectada, id_paciente, fecha_operacion)
    VALUES (operacion, responsable, tabla, paciente, CURRENT_TIMESTAMP);

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER paciente_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON paciente
FOR EACH ROW EXECUTE FUNCTION audit_func('id');

CREATE TRIGGER historial_medico_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON historial_medico
FOR EACH ROW EXECUTE FUNCTION audit_func('id');

CREATE TRIGGER medicamento_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON medicamento
FOR EACH ROW EXECUTE FUNCTION audit_func('id');

CREATE TRIGGER citas_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON cita
FOR EACH ROW EXECUTE FUNCTION audit_func('id');

CREATE TRIGGER usuario_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON usuario
FOR EACH ROW EXECUTE FUNCTION audit_func('id');

CREATE TRIGGER doctor_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON doctor
FOR EACH ROW EXECUTE FUNCTION audit_func('id');

CREATE TRIGGER enfermera_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON enfermera
FOR EACH ROW EXECUTE FUNCTION audit_func('id');