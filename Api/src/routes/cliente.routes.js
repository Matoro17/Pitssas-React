const router = require('express-promise-router')();
const clienteController = require('../controllers/cliente.controller');


router.post('/clientes', clienteController.createCliente);

module.exports = router;