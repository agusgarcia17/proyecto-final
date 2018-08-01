const axios = require('axios');

const service = {}

const author = {
    'name': 'Maria Agustina',
    'lastname': 'Garcia'
    } 

const BASE_URL = `https://api.mercadolibre.com`
const API_SEARCH = `/sites/MLA/search?limit=4&q=`


service.busqueda = function (search) {

    return axios 
    .get(`${BASE_URL}${API_SEARCH}${search}`)
    .then(res => res.data)
    .then(data =>  {
        
        var filters = data.filters

        for (var i = 0; i<filters.length; i++){
            var i = filters[0]

            var values = i.values
            var paths = values[0].path_from_root
            var categories = paths.map(p=> p.name)
        }

        var resultados =  {
                'author': author,
                'categories': categories,
                'items': data.results.map(d => 

                    objeto = {

                    "id": d.id,
                    "title": d.title,
                    "price": {
                        "currency": d.currency_id,
                        "amount": Math.floor(d.price),
                        "decimals": d.price.toString().split('.')[1]
                         },
                    "picture": d.thumbnail,
                    "condition": d.condition,
                    "free_shipping": d.free_shipping,
                    "location": d.address.state_name,
                })
        }
        return resultados
    })
    .catch (function(e){
        console.log('No se pudo realizar la busqueda', e)
    })
}


service.detalle = function(id){
    
    var objeto = []


    return axios 
        .get(`${BASE_URL}/items/${id}`)
        .then(res => res.data)
        .then(data => {

            
            var item =  {
                'author': author,
                'item':  {
                    "id": data.id,
                    "title": data.title,
                    "price": {
                        "currency": data.currency_id,
                        "amount": Math.floor(data.price),
                        "decimals": data.price.toString().split('.')[1]
                    },
                    "picture": data.thumbnail,
                    "condition": data.condition,
                    "free_shipping": data.free_shipping,
                    "sold_quantity":data.sold_quantity,
                    "category": data.category_id
                }}
                
                objeto.push(item.item)
                return objeto
                
        })
        .then( cat => {

            var categoria = objeto.map(c=>c.category)

            return axios 
                .get(`${BASE_URL}/categories/${categoria}`)
                .then(res => res.data)
                .then(data => { 
                    
                    var category = data.path_from_root

                    var path = category.map(p=> p.name)

                    objeto[0].path = path
                    return objeto
                })

            })
        .then( prod => {
            return axios 
                .get(`${BASE_URL}/items/${id}/description`)
                .then(res => res.data)
                .then(data => {

                    objeto[0].descripcion = data.plain_text
                    return objeto
                })
    
        })
        .catch (function(e){
            console.log('No se puede visualizar el producto', e)
        })
}
module.exports = service