import React, { Component } from 'react';
import './App.css';
import Search from './components/search'
import Resultados from './components/resultados'
import Detalle from './components/detalle'
import Home from './components/home'

import{
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'



class App extends Component {
  render() {
    return (
        <div className='mainContainer'>
        <Search/>
        <Router>
          <section className='Rutas'>
            <Route exact path="/" component={Home}/>	
            <Route exact path="/items" component={Resultados}/>
            <Route path="/api/items/:id" component={Detalle}/>
           </section>
        </Router>
        </div>
    );
  }
}

export default App;
