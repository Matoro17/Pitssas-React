const db = require("../config/database");
const io = require('socket.io');
var socket = io();
 
exports.createPedido = async (req, res) => {
    const { clienteid, subtotal, pedido, entrega, pagamento, troco, pronto, enviado, arquivado} = req.body;
    const { rows } = await db.query(
      "INSERT INTO pedidos (clienteid, subtotal, pedido, entrega, pagamento, troco, pronto, enviado, arquivado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [clienteid, subtotal, pedido, entrega, pagamento, troco, pronto, enviado, arquivado]
    );
  
    res.status(201).send({
      message: "Pedido adicionado com sucesso!",
      body: {
        user: { clienteid, subtotal, pedido, entrega, pagamento, troco, pronto, enviado, arquivado }
      },
    });
  };


exports.listarAllPedidos = async (req, res) => {
    const response = await db.query('SELECT * FROM pedidos ORDER BY timestamp ASC');
    res.status(200).send(response.rows);
};

exports.listarAllPedidosArquivados = async (req, res) => {
    const response = await db.query('SELECT * FROM pedidos  WHERE arquivado=true ORDER BY timestamp ASC');
    res.status(200).send(response.rows);
};

exports.listarAllPedidosNaoArquivados = async (req, res) => {
    const response = await db.query('SELECT * FROM pedidos  WHERE arquivado=false ORDER BY timestamp ASC');
    res.status(200).send(response.rows);
};

exports.marcarPedidoPronto = async (req,res)=>{
    const pedidoid = parseInt(req.params.id);
    const response = await db.query('UPDATE pedidos SET pronto = $1 WHERE pedidoid = $2 ',[1,pedidoid]);
    res.status(200).send({ message: "Estado do pedido atualizado com sucesso para PRONTO!" });
    socket.emit("update-lista")
};
exports.marcarPedidoEnviado = async (req,res)=>{
    const pedidoid = parseInt(req.params.id);
    const response = await db.query('UPDATE pedidos SET enviado = $1 WHERE pedidoid = $2 ',[1,pedidoid]);
    res.status(200).send({ message: "Estado do pedido atualizado com sucesso para ENVIADO!" });
    socket.emit("update-lista")
  };
exports.marcarPedidoArquivado = async (req,res)=>{
  const pedidoid = parseInt(req.params.id);
  const response = await db.query('UPDATE pedidos SET arquivado = $1 WHERE pedidoid = $2 ',[1,pedidoid]);
  res.status(200).send({ message: "Estado do pedido atualizado com sucesso para ARQUIVADO!" });
  socket.emit("update-lista")
};