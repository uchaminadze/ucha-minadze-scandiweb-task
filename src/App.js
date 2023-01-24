import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Bag from './Pages/Bag';
import Error from './Pages/Error';

class App extends PureComponent {


  render() {
    return (
      <Router>
        <Navbar/>

        <Switch>
          <Route path='/product/:id' component={ProductDetails}/>
          <Route path='/bag' component={Bag}/>
          <Route exact path='/:categories' component={Home}/>
          <Route exact path='/' render={() => {
            return(
              <Redirect to='/all'/>
            )
          }}>

          </Route>
          <Route path='*' component={Error}/>
        </Switch>
        
      </Router>

    )
  }
}


export default App;
