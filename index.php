<?php
// Incluye el archivo de configuración que contiene la configuración del cliente de Google.
include('config.php');

// Inicializa una variable para el botón de inicio de sesión.
$login_button = "";

// Verifica si se recibió el código de autenticación de Google.
if(isset($_GET["code"])) {
    // Obtiene el token de acceso de Google con el código de autenticación.
    $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);
    
    // Si no hay ningún error en el token
    if(!isset($token['error'])) {
        // Establece el token de acceso para el cliente de Google.
        $google_client->setAccessToken($token['access_token']);
        
        // Almacena el token de acceso en la sesión del usuario.
        $_SESSION['access_token'] = $token['access_token'];
        
        // Crea un nuevo servicio de Google OAuth2 con el cliente de Google.
        $google_service = new Google_Service_Oauth2($google_client);
        
        // Obtiene la información del usuario de Google.
        $data = $google_service->userinfo->get();
        
        // Almacena la información del usuario en la sesión.
        if(!empty($data['given_name'])) {
            $_SESSION['user_first_name'] = $data['given_name'];
        }
        
        if(!empty($data['family_name'])) {
            $_SESSION['user_last_name'] = $data['family_name'];
        }
        
        if(!empty($data['email'])) {
            $_SESSION['user_email_address'] = $data['email'];
        }
        
        if(!empty($data['picture'])) {
            $_SESSION['user_image'] = $data['picture'];
        }
        
        // Verifica si el usuario ya existe en la base de datos
        $check_user_query = "SELECT * FROM users WHERE google_id = '".$data['id']."'";
        $result = $conn->query($check_user_query);
        
        if ($result->num_rows == 0) {
            // Si el usuario no existe, inserta el nuevo usuario en la base de datos
            $insert_user_query = "INSERT INTO users (google_id, first_name, last_name, email, picture) VALUES ('".$data['id']."', '".$data['given_name']."', '".$data['family_name']."', '".$data['email']."', '".$data['picture']."')";
            $conn->query($insert_user_query);
        }

        // Redirige al usuario a la página de inicio de sesión.
        header("Location: login.php");
        exit;
    }
}

// Verifica si el token de acceso de Google no está establecido en la sesión del usuario.
if (!isset($_SESSION['access_token'])) {
    // Si el token de acceso no está establecido, se crea el botón de inicio de sesión de Google.
    $login_button = '<a href="' . $google_client->createAuthUrl() . '" class="login-button"><span></span>Iniciar con Gmail</a>';
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
</head>
<style>
    /* Estilos para el botón de iniciar sesión */
    .login-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        background-color: #fff;
        color: rgba(0, 0, 0, 0.54);
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.2px;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
        transition: background-color 0.2s ease, box-shadow 0.2s ease;
        text-decoration: none;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }

    .login-button:hover {
        background-color: rgba(0, 0, 0, 0.04);
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    }

    .login-button span {
        display: inline-flex;
        align-items: center;
        padding-right: 8px;
    }

    .login-button span::before {
        content: "";
        display: inline-block;
        width: 25px;
        height: 25px;
        background-image: url("https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png");
        background-size: cover;
        margin-right: 8px;
    }
</style>
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
                <div class="createAccount">
                    <p>¿No se ha registrado aún?</p><a href="register/register.html">Crea una nueva cuenta</a>
                </div>
                <!-- Botón de inicio de sesión con Google -->
                <div class="google-login">
                    <?php
                    echo '<div align="center">' . $login_button . '</div>';
                    ?>
                </div>
            </form>
            <div class="login-image">
                <img src="assets/login-image.svg" alt="">
            </div>
        </div>
    </main>
    <script type="module" src="JS/login.js"></script>
</body>
</html>
