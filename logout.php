<?php
// Incluye el archivo de configuración, que probablemente contiene la configuración de la base de datos y la inicialización del cliente de Google
include('config.php');

// Cierra la sesión de Google
if (isset($_SESSION['access_token'])) {
    $google_client->revokeToken();
    unset($_SESSION['access_token']);
}

// Cierra la sesión de Facebook si existe un token de acceso de Facebook en la sesión
if (isset($_SESSION['facebook_access_token'])) {
    unset($_SESSION['facebook_access_token']);
}

// Destruye todos los datos de la sesión actual
session_destroy();

// Redirige al usuario a la página index.php
header('location: index.php');
?>

