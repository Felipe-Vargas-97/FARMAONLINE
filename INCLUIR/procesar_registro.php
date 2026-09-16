<?php
// Conexión
$conexion = mysqli_connect("localhost", "root", "", "farmaonline");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombres   = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $cedula    = $_POST['cedula'];
    $correo    = $_POST['correo'];
    $direccion = $_POST['direccion'];
    $celular   = $_POST['celular'];
    
    // Aplicamos SHA-512 a la contraseña
    $pass_cifrada = hash('sha512', $_POST['password']);

    // Insertar en la base de datos
    $sql = "INSERT INTO usuarios (nombres, apellidos, cedula, correo, password, direccion, celular) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
            
    $stmt = mysqli_prepare($conexion, $sql);
    mysqli_stmt_bind_param($stmt, "sssssss", $nombres, $apellidos, $cedula, $correo, $pass_cifrada, $direccion, $celular);

    if (mysqli_stmt_execute($stmt)) {
        // OPCIÓN A: Redirección inmediata (La más usada)
        header("Location: /FARMACIA/index.html");
        exit(); // Es vital poner exit() para que el script se detenga aquí
    } else {
        echo "Error: " . mysqli_error($conexion);
    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($conexion);
}
?>