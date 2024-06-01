<?php
// Incluye el archivo de configuración que contiene la configuración de la base de datos
//usamos un archivo diferente porque la autenticacion con facebook es diferente a la de google
include('config.php');

// Configura la respuesta de cabecera como JSON
header('Content-Type: application/json');

// Obtiene los datos JSON enviados desde el JavaScript
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    // Extrae los datos del usuario de Facebook
    $facebook_id = $data['id'];
    $first_name = $data['first_name'];
    $last_name = $data['last_name'];
    $email = $data['email'];
    $picture = $data['picture']['data']['url'];

    // Verifica si el usuario ya existe en la base de datos
    $check_user_query = "SELECT * FROM users WHERE facebook_id = '$facebook_id'";
    $result = $conn->query($check_user_query);

    if ($result->num_rows == 0) {
        // Si el usuario no existe, inserta el nuevo usuario en la base de datos
        $insert_user_query = "INSERT INTO users (facebook_id, first_name, last_name, email, picture) VALUES ('$facebook_id', '$first_name', '$last_name', '$email', '$picture')";
        $conn->query($insert_user_query);
    }

    // Almacena la información del usuario en la sesión
    $_SESSION['facebook_id'] = $facebook_id;
    $_SESSION['user_first_name'] = $first_name;
    $_SESSION['user_last_name'] = $last_name;
    $_SESSION['user_email_address'] = $email;
    $_SESSION['user_image'] = $picture;

    // Devuelve una respuesta JSON de éxito
    echo json_encode(['success' => true]);
} else {
    // Devuelve una respuesta JSON de error si no se recibe el ID de Facebook
    echo json_encode(['success' => false, 'message' => 'Invalid access token']);
}
?>



