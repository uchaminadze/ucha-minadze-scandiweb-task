import React, { Component } from 'react'
import styles from "../Styles/HomePage.module.css"
import Product from '../Components/Product'
import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client"

import { store } from "../Redux/store";
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: store.getState().category,
      categories: store.getState().categories,
      currency: store.getState().currency,
      isMiniBagOpen: store.getState().isMiniBagOpen,
      locationPath: store.getState().locationPath,

    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ category: store.getState().category, categories: store.getState().categories, currency: store.getState().currency, isMiniBagOpen: store.getState().isMiniBagOpen, locationPath: store.getState().locationPath })
    })
    this.props.detectLocation(this.props.location.pathname)
    setTimeout(() => {
      this.props.storeCategories(this.props.data.categories)
    }, 500)
  }


  componentWillUnmount() {
    this.unsubscribe();
  }

  showProducts() {
    if (!this.props.data.loading) {
      const categories = this.props.data.categories;
      const { products } = categories.find(category => category.name === localStorage.getItem("category"))
      return (
        products.map(product => {
          const currentCurrencyPrice = product.prices.find(currency => currency.currency.symbol === this.state.currency)

          return <Product data={product} price={currentCurrencyPrice} key={product.id} />
        })
      )

    } else return <h1>Loading...</h1>
  }

  render() {

    return (
      <>
        <div className={styles.container} >
          {this.props.data.categories && (
            <>
              <h1>{localStorage.getItem("category").toUpperCase()}</h1>

              <div className={styles.productsList}>{this.showProducts()}</div>
            </>
          )}
        </div>
      </>
    );
  }
}

const GET_DATA = gql`{
  categories{
    name
    products{
      id
      __typename @skip(if: true)
      name
      brand
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
      attributes{
        type
        name
        items{
          id
          __typename @skip(if: true)
          value
          displayValue
        }
      }
    }
  }
}`


const mapDispatchToProps = (dispatch) => {
  return {
    detectLocation: (locationPath) => dispatch({ type: "CHANGED_LOCATION_PATH", locationPath: locationPath }),
    storeCategories: (categories) => dispatch({ type: "CATEGORIES", categories: categories })
  };
};

export default compose(
  graphql(GET_DATA),
  connect(null, mapDispatchToProps)
)(Home);