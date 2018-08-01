import React, { Component } from 'react';
import './../css/detalle.css';

class Detalle extends Component {
  constructor (props) {
    super(props);
    this.state={
      producto:[],
      category:[],
  	}
  }

  componentDidMount(){ 
  	const id = this.props.match.params.id;
    fetch(`/api/items/${id}`)
   .then(res=>res.json())
   .then(res=>{
    this.setState({producto:res[0],
    category:res[0].path})
   
  })
   .catch(function(e){
    console.log('No se puede visualizar el producto')}
    )
  }
  
  render() {

    if(this.state.producto.length === 0){
      return(<section className='spinner'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></section>)      
    }else{

      return(

        <section className='detalle'>
      
      {this.state.category ? 
        <section >          
          <ul className='breadcrumb'>
            {this.state.category.map(b => (
              <li className='bC' key= {b} > {b} </li>
            ))}
          </ul>
        </section>
        : ''
        }

  				<div className="data">
              <div className="picture">
                <img src={this.state.producto.picture} alt='pic'/>
              </div>
              <div className="side">
                  <p className="stateSold">
                  {this.state.producto.condition === 'new' ? 'Nuevo ' : ('used' ? 'Usado ' : "Sin especificar ")}
                   - {this.state.producto.sold_quantity} vendidos</p>

                <div className="itemName">{this.state.producto.title}</div>
                <div className="itemPrecio">${(this.state.producto.price.amount).toLocaleString()}
                  <sup>
                  {this.state.producto.price.decimals ? (this.state.producto.price.decimals) : "00"}
                  </sup>
                </div>
                <div className="btnComprar">Comprar</div>
              </div>
					</div>
					<div className="descripcion">
						<h3>Descripción del producto</h3>
						<pre>{this.state.producto.descripcion}</pre>
					</div>

        </section>
      )}}
}

export default Detalle;