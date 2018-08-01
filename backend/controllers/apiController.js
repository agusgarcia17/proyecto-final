const apiService = require('../services/apiService')

const self = {}


self.traerResultados = function (req, res, next) {

    var resultado =req.query.search;

    return apiService.busqueda(resultado)
    .then(function(lista){
		return res.json(lista)
	})
	.catch(function(e){
		console.log('No se pueden traer los products',e)
	})
}

self.traerItem = function(req, res, next){

    var id = req.params.id;
    
    return apiService.detalle(id)
    .then(function(detalle){
        
        return res.json(detalle)
    })
    .catch(function(e){
		console.log('No se puede visualizar el item seleccionado',e)
	})

    };

module.exports = self;