//Es un servidor creado con Node.js que usa Express.js (una herramienta de Node.js) para gestionar las solicitudes que se hacen desde internet.


//importando cuatro módulos 
const express = require('express');//servidor
const path = require('path');//traer las rutas de archivos
const mysql = require('mysql');//interactuar con la base de datos
const bodyParser = require('body-parser');//obtener datos de formularios

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
app.use(bodyParser.urlencoded({ extended: false }));//urlendcode es para decir como queremos que espere los datos, en este caso que los espere como string--extend es para determinar el tipo de libreria -- false: querystring - true:qs
app.use(bodyParser.json());

// Rutas para páginas --- solicitudes get--Cuando el servidor recibe una solicitud GET a la ruta '/products', responde enviando el archivo 'products.
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
app.post("/products", function(req, res){
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

    let registrar = "INSERT INTO orders(orderID, orderFecha, clientName, orderSC, orderDestiny, orderAmount, orderStatus) VALUES ('"+orderID+"' , '"+orderFecha+"' , '"+clientName+"' , '"+orderSC+"','"+orderDestiny +"','"+orderAmount+"','"+orderStatus+"')";
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



