DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS clientes;
CREATE TABLE users (
	userId INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255),
    PRIMARY KEY (userId),
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes(
    clienteId INT GENERATED ALWAYS AS IDENTITY,
    nome VARCHAR(255) NOT NULL,
    bairro VARCHAR(255),
    rua VARCHAR(255),
    numero VARCHAR(255),
    complemento VARCHAR(255),
    referencia VARCHAR(255),
    identificador VARCHAR(255) NOT NULL,
    PRIMARY KEY (clienteId),
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
	pedidoId INT GENERATED ALWAYS AS IDENTITY ,
    clienteId INT NOT NULL,
	subtotal FLOAT NOT NULL,
	pedido VARCHAR(255) NOT NULL,
	entrega FLOAT,
    pagamento VARCHAR(255),
    troco FLOAT,
    pronto BOOLEAN,
    enviado BOOLEAN,
    arquivado BOOLEAN,
    PRIMARY KEY (pedidoId),
    FOREIGN KEY (clienteId) REFERENCES clientes(clienteId),
    timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
     
);


