<?php
$host = "localhost";    // El servidor de Farmaonline
$user = "";
$pass = "";
$db   = "farmaonline";

// Crear la conexión
$conexion = mysqli_connect($host, $user, $pass, $db);

// Verificar si funcionó
if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}
echo "¡Conexión exitosa a Farmaonline!";
?>