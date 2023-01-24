import React, { PureComponent } from 'react'
import styles from "../Styles/HomePage.module.css"
import Product from '../Components/Product'
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ALL_PRODUCTS } from '../api/allProducts'; 

class Home extends PureComponent {
  
  componentDidMount() {
    this.props.detectLocation(this.props.location.pathname)
    setTimeout(() => {
      this.props.storeCategories(this.props.data.categories)
    }, 500)
  }
  

  showProducts() {
    if (!this.props.data.loading) {
      const {pathname} = this.props.location
      const path = pathname.split('').splice(1, pathname.length - 1).join('')
      console.log(pathname)
      const categories = this.props.data.categories;
      const { products } = categories.find(category => category.name === path)
      return (
        products.map(product => {
          const currentCurrencyPrice = product.prices.find(currency => currency.currency.symbol === this.props.currency)

          return <Product data={product} price={currentCurrencyPrice} key={product.id} />
        })
      )

    } else return <h1>Loading...</h1>
  }

  render() {
    const {pathname} = this.props.location
    const path = pathname.split('').splice(1, pathname.length - 1).join('')

    return (
      <>
        <div className={styles.container} >
          {this.props.data.categories && (
            <>
              <h1>{path.toUpperCase()}</h1>

              <div className={styles.productsList}>{this.showProducts()}</div>
            </>
          )}
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    currency: state.currency
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    detectLocation: (locationPath) => dispatch({ type: "CHANGED_LOCATION_PATH", locationPath: locationPath }),
    storeCategories: (categories) => dispatch({ type: "CATEGORIES", categories: categories })
  };
};

export default compose(
  graphql(ALL_PRODUCTS),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);