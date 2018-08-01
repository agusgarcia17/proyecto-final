import React, { Component } from 'react';
import queryString from 'query-string';
import './../css/resultados.css';
import Truck from './../img/truck.svg';


import {
  // BrowserRouter as Router,
  // Route,
 Link
} from 'react-router-dom'


class Lista extends Component {
  constructor (props) {
    super(props);
    this.state=({
      products: null,
      categories:[]
  	})
  }


    componentDidMount(){ 

      const busqueda = queryString.parse(this.props.location.search)
        fetch(`/api/items?search=${busqueda.q}`)
        .then(res=>res.json())
        .then(res=>{
          this.setState({
            products:res.items,
            categories: res.categories
          })
        })

        .catch(function(e){
          console.log('no puede responder lista',e)}
      )
    }
   
  render() {
   
    if(this.state.products === null){
      return(<section className='spinner'> <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></section>)      
    }else{

      if(this.state.products.length ===0){
        return( <h2 className='error'> No hay productos para tu busqueda, por favor intenta nuevamente </h2>)
      }
      else{

      return(
        
        <section className='contenedorLista'>

        {this.state.categories ? 
        <section >          
          <ul className='breadcrumb'>
            {this.state.categories.map(b => (
              <li className='bC' key= {b} > {b} </li>
            ))}
          </ul>
        </section>
        : ''
        }
 
            <ul> 
            {this.state.products.map(p => (
              <li className='producto' key={p.id}>
                <a href={'/api/items/'+p.id+'/description'}>
                  <img className='thumb' src={p.picture} alt='Producto listado'/>
                </a>
                <section className='datos'>
                  <div className='encuadre'>
                    <div className='fa'>
                    <p className='precio'>
                      {p.price.currency==='ARS'?'$ ':'USD '}
                      {(p.price.amount).toLocaleString()}
                      {(p.price.decimals ? "," + (p.price.decimals) : ",00")}
                    </p>                                
                    <div className='envio'>
                      <img className='truck' src={Truck} alt='truck' /> 
                    </div>
                    </div>
                    <p className='location'> {p.location} </p>
                  </div>
                    <Link className='link' to={'/api/items/'+p.id+'/description'}>
                      <p className='titulo'>{p.title}</p>
                    </Link>
                  </section>            
            </li>)
            )}
            </ul>
          </section>
      )

    }
  }
  }
}

export default Lista;