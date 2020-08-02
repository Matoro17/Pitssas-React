const db = require("../config/database");

exports.createCliente = async (req, res) => {
    const { nome, bairro, rua, numero, referencia, identificador} = req.body;
    const { rows } = await db.query(
      "INSERT INTO clientes (nome, bairro, rua, numero, referencia, identificador) VALUES ($1,$2,$3,$4,$5,$6)",
      [nome, bairro, rua, numero, referencia, identificador]
    );
  
    res.status(201).send({
      message: "Client added successfully!",
      body: {
        user: { nome, bairro, rua, numero, referencia, identificador }
      },
    });
};

exports.findClienteById = async (req, res) => {
    const clienteId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM clientes WHERE clienteId = $1', [clienteId]);
    res.status(200).send(response.rows);
};
exports.findClienteByIdentificador = async (req, res) => {
  const identificador = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM clientes WHERE identificador = $1', [identificador]);
  res.status(200).send(response.rows);
};