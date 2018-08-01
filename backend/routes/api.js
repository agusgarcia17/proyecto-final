var express = require('express');
var router = express.Router();
const axios = require('axios');
var apiController = require('../controllers/apiController');


router.get('/items', apiController.traerResultados) 
  
router.get('/items/:id', apiController.traerItem)
  
router.get('/items/:id/description', apiController.traerItem)
    
module.exports = router;