import React, { Component } from 'react';
import Logo from './../img/logoAda.svg';
import Lupa from './../img/magnifier.svg';
import './../css/search.css';

class Search extends Component {

    onSubmit (e){}
    
  render() {
    return (
        <div className='searchBar'>
            <section className='navegador'>
                <a href = '/' className='homeLink'><img className="logo" src={Logo} alt='logo'/></a>
                <form className='divNav' action='/items' method='get'>
                    <input className="barra" type="text" placeholder="Nunca dejes de buscar" name='q'/>
                    <button type='submit' className='btn'><img className='lupa' src={Lupa} alt='lupa'/></button>
                </form>
            </section>

        </div>
    );
  }
}


export default Search