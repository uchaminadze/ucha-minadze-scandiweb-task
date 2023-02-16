import React, { PureComponent } from 'react'
import styles from "../Styles/HomePage.module.css"
import Product from '../Components/Product'
import { connect } from 'react-redux';

class Home extends PureComponent {

  componentDidMount() {
    this.props.detectLocation(this.props.location.pathname)
    this.props.detectPageUserIsOn("home")
    setTimeout(() => {
      this.props.storeCategories(this.props.categories)
    }, 500)
  }


  showProducts() {
    if (!this.props.loading) {
      const { pathname } = this.props.location
      const path = pathname.split('').splice(1, pathname.length - 1).join('')
      const categories = this.props.categories;
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
    const { pathname } = this.props.location
    const path = pathname.split('').splice(1, pathname.length - 1).join('')
    return (
      <>
        <div className={styles.container} >
          {this.props.categories && (
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
  return {
    currency: state.currency,
    pageUserIsOn: state.pageUserIsOn
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    detectLocation: (locationPath) => dispatch({ type: "CHANGED_LOCATION_PATH", locationPath: locationPath }),
    detectPageUserIsOn: (pageUserIsOn) => dispatch({ type: "PAGE__USER__IS__ON", pageUserIsOn: pageUserIsOn }),
    storeCategories: (categories) => dispatch({ type: "CATEGORIES", categories: categories })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);