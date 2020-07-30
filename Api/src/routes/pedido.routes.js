const router = require('express-promise-router')();
const pedidoController = require('../controllers/pedido.controller');

router.post('/pedidos', pedidoController.createPedido);
router.get('/pedidos/', pedidoController.listarAllPedidos);
router.get('/pedidos/naoarquivados', pedidoController.listarAllPedidosNaoArquivados);
router.get('/pedidos/arquivados', pedidoController.listarAllPedidosArquivados);

module.exports = router;