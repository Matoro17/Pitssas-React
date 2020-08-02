const router = require('express-promise-router')();
const pedidoController = require('../controllers/pedido.controller');

router.post('/pedidos', pedidoController.createPedido);
router.get('/pedidos/', pedidoController.listarAllPedidos);
router.get('/pedidos/naoarquivados', pedidoController.listarAllPedidosNaoArquivados);
router.get('/pedidos/arquivados', pedidoController.listarAllPedidosArquivados);

router.put('/pedidos/pronto/:id', pedidoController.marcarPedidoPronto);
router.put('/pedidos/enviado/:id', pedidoController.marcarPedidoEnviado);
router.put('/pedidos/arquivar/:id', pedidoController.marcarPedidoArquivado);

module.exports = router;