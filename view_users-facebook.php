<?php
//Este archivo muestra una lista de todos los usuarios registrados en la base de datos.
// Incluye el archivo de configuración que establece la conexión con la base de datos
include('config.php');

// Crea una consulta SQL para seleccionar todos los registros de la tabla 'users'
$sql = "SELECT * FROM facebook_users";
// Ejecuta la consulta SQL y guarda el resultado en la variable $result
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Usuarios</title>
    <!-- estilos CSS de Bootstrap en tu página -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h2>Lista de Usuarios Registrados</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <!-- Define las columnas de la tabla -->
                    <th>ID</th>
                    <th>Facebook ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Picture</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Verifica si la consulta SQL devolvió algún resultado
                if ($result->num_rows > 0) {
                    // Si hay resultados, los recorre uno por uno
                    while($row = $result->fetch_assoc()) {
                        // Para cada resultado, crea una nueva fila en la tabla y llena las celdas con los datos del usuario
                        echo "<tr>";
                        echo "<td>" . $row["id"] . "</td>";
                        echo "<td>" . $row["facebook_id"] . "</td>";
                        echo "<td>" . $row["first_name"] . "</td>";
                        echo "<td>" . $row["last_name"] . "</td>";
                        echo "<td>" . $row["email"] . "</td>";
                        echo "<td><img src='" . $row["picture"] . "' width='50'></td>";
                        echo "<td>" . $row["created_at"] . "</td>";
                        echo "</tr>";
                    }
                } else {
                    // Si no hay resultados, muestra un mensaje en la tabla
                    echo "<tr><td colspan='7'>No hay usuarios registrados</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>

<?php
// Cierra la conexión con la base de datos
$conn->close();
?>
