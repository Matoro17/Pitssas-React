const router = require('express-promise-router')();
const clienteController = require('../controllers/cliente.controller');


router.post('/clientes', clienteController.createCliente);
router.get('/clientes',clienteController.getAllClientes);
router.get('/clientes/:id',clienteController.findClienteById);
router.get('/clientes/identificador/:id',clienteController.findClienteByIdentificador);

module.exports = router;