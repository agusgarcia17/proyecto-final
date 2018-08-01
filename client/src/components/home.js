import React, { Component } from 'react';
import Logo from './../img/logoAda.svg';
import './../css/home.css';

class Home extends Component {

    
  render() {
    return (
        <div className='home'>
            <section className='pepe'>
                <img className='homeLogo' src={Logo} alt='logo'/>
            </section>

        </div>
    );
  }
}

export default Home