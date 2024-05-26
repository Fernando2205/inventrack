<?php
// Verifica si una sesión ya está iniciada antes de iniciar una nueva sesión
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Incluye el archivo de configuración que contiene la configuración del cliente de Google.
$nonce_value = bin2hex(random_bytes(16));

include('config.php');

// Inicializa una variable para el botón de inicio de sesión.
$login_button = "";

//iniciar sesion con google
// Verifica si se recibió el código de autenticación de Google.
if (isset($_GET["code"])) {
    // Obtiene el token de acceso de Google con el código de autenticación.
    $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);
    
    // Si no hay ningún error en el token
    if (!isset($token['error'])) {
        // Establece el token de acceso para el cliente de Google.
        $google_client->setAccessToken($token['access_token']);
        
        // Almacena el token de acceso en la sesión del usuario.
        $_SESSION['access_token'] = $token['access_token'];
        
        // Crea un nuevo servicio de Google OAuth2 con el cliente de Google.
        $google_service = new Google_Service_Oauth2($google_client);
        
        // Obtiene la información del usuario de Google.
        $data = $google_service->userinfo->get();
        
        // Almacena la información del usuario en la sesión.
        $_SESSION['user_first_name'] = $data['given_name'];
        $_SESSION['user_last_name'] = $data['family_name'];
        $_SESSION['user_email_address'] = $data['email'];
        $_SESSION['user_image'] = $data['picture'];
        $_SESSION['login_user'] = true;
        
        // Verifica si el usuario ya existe en la base de datos
        $check_user_query = "SELECT * FROM google_users WHERE google_id = '".$data['id']."'";
        $result = $conn->query($check_user_query);
        
        if ($result->num_rows == 0) {
            // Si el usuario no existe, inserta el nuevo usuario en la base de datos
            $insert_user_query = "INSERT INTO users (google_id, first_name, last_name, email, picture) VALUES ('".$data['id']."', '".$data['given_name']."', '".$data['family_name']."', '".$data['email']."', '".$data['picture']."')";
            $conn->query($insert_user_query);
        }

        // Redirige al usuario a la página de dashboard
        header("Location: pages/dashboard/dashboard.html");
        exit;
    }
}

// Verifica si el token de acceso de Google no está establecido en la sesión del usuario.
if (!isset($_SESSION['access_token'])) {
    // Si el token de acceso no está establecido, se crea el botón de inicio de sesión de Google.
    $login_button = '<a href="' . $google_client->createAuthUrl() . '" class="login-button"><span></span>Iniciar con Gmail</a>';
}

//  inicio de sesión con Facebook
if (isset($_GET['facebook_user_data'])) {
    // Obtener datos del usuario de Facebook
    $facebook_user_data = json_decode($_GET['facebook_user_data'], true);

    // Almacenar la información del usuario en la sesión
    $_SESSION['user_first_name'] = $facebook_user_data['first_name'];
    $_SESSION['user_last_name'] = $facebook_user_data['last_name'];
    $_SESSION['user_email_address'] = $facebook_user_data['email'];
    $_SESSION['user_image'] = $facebook_user_data['picture']['data']['url'];
    $_SESSION['login_user'] = true;

    // Verificar si el usuario ya existe en la base de datos
    $check_user_query = "SELECT * FROM facebook_users WHERE facebook_id = '" . $facebook_user_data['id'] . "'";
    $result = $conn->query($check_user_query);

    if ($result->num_rows == 0) {
        // Si el usuario no existe, insértalo en la base de datos
        $insert_user_query = "INSERT INTO facebook_users (facebook_id, first_name, last_name, email, picture) VALUES ('" . $facebook_user_data['id'] . "', '" . $facebook_user_data['first_name'] . "', '" . $facebook_user_data['last_name'] . "', '" . $facebook_user_data['email'] . "', '" . $facebook_user_data['picture']['data']['url'] . "')";
        $conn->query($insert_user_query);
    }

    // Redirigir al usuario a dashboard.html
    header("Location: pages/dashboard/dashboard.html");
    exit;
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ingresar</title>
    <link rel="stylesheet" href="login/login.css">
    <link rel="stylesheet" href="css/alert-message.css">
    <link rel="stylesheet" href="css/botones_login.css">
</head>

<body>
    <main>
        <div class="login">
            <form class="form" id="sumbit-login">
                <img src="assets/Rectangle 37.svg" alt="">
                <p style="font-weight: 500; font-size: 24px;">Login</p>
                <label for="username">Usuario*</label>
                <input id="username" type="text" placeholder="Ingresa tu usuario" class="input" required>
                <label for="password">Contraseña*</label>
                <input type="password" id="password" placeholder="Ingresa tu contraseña" class="input" required>
                <button type="submit" class="login-btn">Ingresar</button>
               
                <!-- Botón de inicio de sesión con Google -->
                <div class="button-container">
                    <div class="google-login">
                        <?php
                        echo '<div align="center">' . $login_button . '</div>';
                        ?>
                    </div>
                    <div class="facebook-login">
                    <button onclick="checkLoginState();" class="fb-login-button-custom"> <img src="https://i0.wp.com/showmeleb.com/wp-content/uploads/2020/06/facebook-logo-png-white-facebook-logo-png-white-facebook-icon-png-32.png?ssl=1" alt="Facebook Logo" class="fb-logo"> Iniciar con Facebook
                    </button>
                </div>
            </div>
            <div class="createAccount">
                    <p>¿No se ha registrado aún?</p><a href="register/register.html">Crea una nueva cuenta</a>
                </div>
            <div id="status"></div>
            </form>
            <div class="login-image">
                <img src="assets/login-image.svg" alt="">
            </div>
        </div>
    </main>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v16.0&appId=1298268964893456&autoLogAppEvents=1"></script>
    <script src="JS/login.js"></script>
    <script src="JS/facebookLogin.js"></script>
</body>

</html>
