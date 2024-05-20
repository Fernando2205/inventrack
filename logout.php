<?php
// Incluye el archivo de configuración, que probablemente contiene la configuración de la base de datos y la inicialización del cliente de Google
include('config.php');

// Llama al método revokeToken del cliente de Google para invalidar el token de acceso de OAuth
// Esto desautoriza la aplicación y el usuario tendrá que autorizarla de nuevo la próxima vez que inicie sesión
$google_client->revokeToken();

// Destruye todos los datos de la sesión actual
// Esto efectivamente cierra la sesión del usuario en la aplicación
session_destroy();

// Redirige al usuario a la página index.php
// Esto se hace enviando una cabecera HTTP de "Location" al navegador del usuario
// El navegador entonces automáticamente carga la página index.php
header('location: index.php');
?>
