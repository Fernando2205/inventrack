<?php
// Inicia una nueva sesión o reanuda la existente
session_start();//Las sesiones son una forma de almacenar información (en variables) que se pueden utilizar en varias páginas,sin la llamada a session_start(), no se puede acceder a la información de la sesión

//usamos esta pagina login.php para redirigir al usuario a la página de dashboard después de iniciar sesión con Google , si redirigieramos directamente a la pagina de dashboard no podriamos obtener el nombr del usuario

// Redirige al usuario a la página de dashboard
header("Location: pages/dashboard/dashboard.html");

// Termina la ejecución del script
exit;

// Verifica si se ha obtenido el nombre del usuario durante el inicio de sesión con Google--
//es un intento fallido de poner el nombre del usuario en la parte d username en la página de dashboard
/*if(!empty($data['given_name'])) {
    // Si se ha obtenido el nombre del usuario, lo guarda en la variable de sesión 'user_first_name'
    $_SESSION['user_first_name'] = $data['given_name'];
}*/

// Redirige al usuario a la página de dashboard
header("Location: pages/dashboard/dashboard.html");

// Termina la ejecución del script
exit;


?>


