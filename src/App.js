import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Bag from './Pages/Bag';
import Error from './Pages/Error';

class App extends Component {


  render() {
    return (
      <Router>
        <Navbar/>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/bag' component={Bag}/>
          <Route path='/product/:id' component={ProductDetails}/>
          <Route path='*' component={Error}/>
        </Switch>
        
      </Router>

    )
  }
}


export default App;
