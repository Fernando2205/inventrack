<?php
// Verifica si una sesión ya está iniciada antes de iniciar una nueva sesión
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Incluye el archivo autoload.php de Composer, que carga automáticamente todas las dependencias
require_once 'vendor/autoload.php';

// Configuración de la conexión a la base de datos
$servername = "localhost";  // Nombre del servidor de la base de datos
$username = "root";  // Nombre de usuario para la base de datos
$password = "";  // Contraseña para la base de datos. Asegúrate de que este sea el password correcto, deja vacío si es local y no tiene password
$dbname = "inventrack";  // Nombre de la base de datos

// Crea una nueva conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica si la conexión a la base de datos ha fallado
if ($conn->connect_error) {
    // Si la conexión ha fallado, termina la ejecución del script y muestra un mensaje de error
    die("Connection failed: " . $conn->connect_error);
}

// Crea una nueva instancia del cliente de Google
$google_client = new Google_Client();

// Configura el ID del cliente de Google
$google_client->setClientId('244868875905-8338lhv0745njc7igmc048lc01dm5o9a.apps.googleusercontent.com');
// Configura el secreto del cliente de Google
$google_client->setClientSecret('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');
// Configura la URI de redirección de Google. Esta es la página a la que el usuario será redirigido después de autenticarse con Google
$google_client->setRedirectUri('http://localhost/inventrack-main/index.php');

// Agrega el alcance del correo electrónico a la solicitud de autenticación de Google. Esto permite a la aplicación acceder al correo electrónico del usuario
$google_client->addScope('email');
// Agrega el alcance del perfil a la solicitud de autenticación de Google. Esto permite a la aplicación acceder a la información del perfil del usuario
$google_client->addScope('profile');
?>


