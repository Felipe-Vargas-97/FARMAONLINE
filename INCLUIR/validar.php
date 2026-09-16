<?php
// Iniciar sesión
session_start();

$host     = "localhost"; 
$db_user  = "root"; 
$db_pass  = ""; 
$db_name  = "farmaonline";

$conexion = mysqli_connect($host, $db_user, $db_pass, $db_name);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Recibir datos
$correo = $_POST['correo'];
$pass   = $_POST['password'];

// Cifrar la contraseña ingresada para comparar (SHA-512 como en el registro)
$pass_cifrada = hash('sha512', $pass);

// Consulta segura
$sql = "SELECT id, nombres FROM usuarios WHERE correo = ?";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, "s", $correo);
mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);

if ($usuario = mysqli_fetch_assoc($resultado)) {
    // El usuario existe, ahora comparamos la contraseña cifrada
    $sql_pass = "SELECT id, nombres FROM usuarios WHERE correo = ? AND password = ?";
    $stmt_pass = mysqli_prepare($conexion, $sql_pass);
    mysqli_stmt_bind_param($stmt_pass, "ss", $correo, $pass_cifrada);
    mysqli_stmt_execute($stmt_pass);
    $res_pass = mysqli_stmt_get_result($stmt_pass);

    if ($datos_finales = mysqli_fetch_assoc($res_pass)) {
        // LOGIN EXITOSO
        $_SESSION['usuario_id'] = $datos_finales['id'];
        $_SESSION['nombre'] = $datos_finales['nombres'];
        header("Location: /FARMACIA/INICIO.html");
        exit();
    } else {
        // CONTRASEÑA INCORRECTA
        header("Location: /FARMACIA/index.html?error=1");
        exit();
    }
} else {
    // EL USUARIO NO EXISTE
    header("Location: /FARMACIA/index.html?error=2");
    exit();
}

mysqli_close($conexion);
?>