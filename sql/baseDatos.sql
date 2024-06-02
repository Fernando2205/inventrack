--esta es nuestra base de datos en mysql para ver los usuarios que se registran desde google--pendiente los usuarios que se registran desde registro normal
CREATE DATABASE inventrack;

USE inventrack;-- Selecciona "inventrack" como la base de datos a utilizar para las siguientes instrucciones SQL

CREATE TABLE google_users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE facebook_users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    facebook_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT NOT NULL,
    productName VARCHAR(255) NOT NULL,
    productPrice DECIMAL(10, 2) NOT NULL,
    productCategory VARCHAR(255) NOT NULL,
    productSalesChannel VARCHAR(255) NOT NULL,
    productInstruction VARCHAR(255) NOT NULL,
    productAmount INT NOT NULL,
    productStatus VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE orders (
    orderID INT PRIMARY KEY,
    orderFecha DATE,
    clientName VARCHAR(255),
    orderSC VARCHAR(255),
    orderDestiny VARCHAR(255),
    orderAmount INT,
    orderStatus VARCHAR(255)
);
