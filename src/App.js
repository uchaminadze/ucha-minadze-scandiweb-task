import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Bag from './Pages/Bag';
import Error from './Pages/Error';
import { compose } from 'redux';
import { graphql } from '@apollo/client/react/hoc';
import { ALL_PRODUCTS } from './api/allProducts';

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      navCategories: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      navCategories: props.data.categories
    }
  }




  render() {
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <Navbar navCategories={this.state.navCategories} location={location} history={history} />
          )}
        />
        <Switch>
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/bag' component={Bag} />
          <Route exact path='/:categories' render={(props) => <Home {...props} categories={this.state.navCategories} />} />
          <Route exact path='/' render={() => {
            return (
              <Redirect to='/all' />
            )
          }}>

          </Route>
          <Route path='*' component={Error} />
        </Switch>

      </Router>

    )
  }
}


export default compose(graphql(ALL_PRODUCTS))(App);
