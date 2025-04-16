const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Routes for /api/clients
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;