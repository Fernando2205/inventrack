// Importamos los módulos necesarios
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Creamos una nueva aplicación Express
const app = express();

// Servimos archivos estáticos desde los directorios 'pages', 'css' y 'JS'
app.use(express.static(path.join(__dirname, '..', 'pages')));
app.use(express.static(path.join(__dirname, '..', 'css')));
app.use(express.static(path.join(__dirname, '..', 'JS')));

// Configuramos la conexión a la base de datos MySQL
let conexion = mysql.createConnection({
    host: "localhost",  //  IP del servidor MySQL
    database: "inventrack",
    user: "root",  //  usuario de MySQL
    password: ""  // 
});

//  conectar a la base de datos
conexion.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Configuramos body-parser para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para renderizar el formulario de productos
app.get('/products', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'pages', 'products', 'products.html'));
});

// Ruta para renderizar la página de stock
app.get('/instock', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'pages', 'stock', 'instock.html'));
});

// Ruta para obtener los datos de la tabla "products"
app.get('/instock-data', (req, res) => {
    const consulta = 'SELECT * FROM products';
    conexion.query(consulta, (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener datos de la base de datos');
        }
        res.json(resultados);
    });
});

// Ruta para manejar la solicitud del formulario
app.post("/validar", function(req, res){
    const datos = req.body; // Obtiene todos los datos del formulario en la variable 'datos'

    // Extrae cada campo del formulario
    let ID = datos.productID;
    let name = datos.productName;
    let price = datos.productPrice;
    let category = datos.productCategory;
    let channel = datos.productSC;
    let instruction = datos.productInstruction;
    let amount = datos.productAmount;
    let status = datos.productStatus;

    // Verificar si ya existe un registro con el mismo ID
    let buscar = "SELECT * FROM products WHERE id = ?";
    conexion.query(buscar, [ID], function(error, row) {
        if (error) {
            throw error;
        } else {
            if (row.length > 0) {
                console.log("No se puede registrar, el ID ya existe");
            } else {
                // Insertar los datos en la base de datos
                let registrar = "INSERT INTO products(id,productName,productPrice,productCategory,productSalesChannel,productInstruction,productAmount,productStatus) VALUES ('"+ID+"' , '"+name+"' , '"+price+"' , '"+category+"','"+channel +"','"+instruction+"','"+amount+"','"+status+"')";

                conexion.query(registrar, function(error){
                    if(error){
                        throw error;
                    }else{
                        console.log("datos almacenados correctamente");
                
                        // Redireccionas al usuario a stock.html
                        res.redirect("/instock");                    
                    }
                });
            }
        }
    });
});

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});






