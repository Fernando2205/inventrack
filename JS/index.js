const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'pages')));
app.use(express.static(path.join(__dirname, '..', 'css')));
app.use(express.static(path.join(__dirname, '..', 'JS')));
app.use(express.static(path.join(__dirname, '..', 'assets')));

// Configuración de la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "inventrack",
    user: "root",
    password: ""
});

conexion.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Configuración de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas para páginas
app.get('/products', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'pages', 'products', 'products.html'));
});

app.get('/instock', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'pages', 'stock', 'instock.html'));
});

app.get('/orders', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'pages', 'orders', 'orders.html'));
});

// Rutas para obtener datos
app.get('/instock-data', (req, res) => {
    const consulta = 'SELECT * FROM products';
    conexion.query(consulta, (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener datos de la base de datos');
        }
        res.json(resultados);
    });
});

app.get('/orders-data', (req, res) => {
    const consulta = 'SELECT * FROM orders';
    conexion.query(consulta, (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener datos de la base de datos');
        }
        res.json(resultados);
    });
});

// Ruta para manejar la solicitud del formulario de productos
app.post("/validar", function(req, res){
    const datos = req.body;

    let ID = datos.productID;
    let name = datos.productName;
    let price = datos.productPrice;
    let category = datos.productCategory;
    let channel = datos.productSC;
    let instruction = datos.productInstruction;
    let amount = datos.productAmount;
    let status = datos.productStatus;

    let buscar = "SELECT * FROM products WHERE id = ?";
    conexion.query(buscar, [ID], function(error, row) {
        if (error) {
            throw error;
        } else {
            if (row.length > 0) {
                console.log("No se puede registrar, el ID ya existe");
            } else {
                let registrar = "INSERT INTO products(id, productName, productPrice, productCategory, productSalesChannel, productInstruction, productAmount, productStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                conexion.query(registrar, [ID, name, price, category, channel, instruction, amount, status], function(error) {
                    if (error) {
                        throw error;
                    } else {
                        console.log("datos almacenados correctamente");
                        res.redirect("/instock");
                    }
                });
            }
        }
    });
});

// Ruta para manejar la solicitud del formulario de órdenes
app.post("/orders", function(req, res) {
    const datos = req.body;

    let orderID = datos.orderID;
    let orderFecha = datos.orderFecha;
    let clientName = datos.clientName;
    let orderSC = datos.orderSC;
    let orderDestiny = datos.orderDestiny;
    let orderAmount = datos.orderAmount;
    let orderStatus = datos.orderStatus;

    let registrar = "INSERT INTO orders(orderID, orderFecha, clientName, orderSC, orderDestiny, orderAmount, orderStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";
    conexion.query(registrar, [orderID, orderFecha, clientName, orderSC, orderDestiny, orderAmount, orderStatus], function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Orden almacenada correctamente");
            res.redirect("/orders");
        }
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



