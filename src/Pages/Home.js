import React, { Fragment, PureComponent } from 'react'
import styles from "../Styles/HomePage.module.css"
import Product from '../Components/Product'
import { connect } from 'react-redux';
import Sidebar from '../Components/Sidebar';

class Home extends PureComponent {

  state = {
    categories: [],
    filteredProducts: [],
    isLoading: false
  }
  
  static getDerivedStateFromProps(props, state) {
    return{
      categories: props.categories
    }
  }
  
  componentDidMount() {
    this.props.detectLocation(this.props.location.pathname)
    this.props.detectPageUserIsOn("home")
    setTimeout(() => {
      this.props.storeCategories(this.props.categories)
      this.setState({isLoading: false})
    }, 500)
    this.setState({isLoading: true})
  }

  
  showProducts() {
      const { pathname } = this.props.location
      const path = pathname.split('').splice(1, pathname.length - 1).join('')
      const categories = this.props.categories;

      const filteredProducts = categories.map((category) => {
        const filteredProducts = category.products.filter((product) =>
          product.attributes.some((attribute) => 
            attribute.items.some((item) => {
              return categories.find(category => category.name === path).products.some((products) => {
                return products.attributes.some((singleP) => {
                  return singleP.items.some((singleAttr) => {
                    return Object.values(this.props.attributes).some((el) => {
                      return JSON.stringify(el) === JSON.stringify(item) && JSON.stringify(el) === JSON.stringify(singleAttr)
                    })
                  })
                })
              })
            })
          )
        );
        return { ...category, products: filteredProducts };
      });

      const products = Object.values(this.props.attributes).find((el) => el) ? filteredProducts[0].products : categories.find(category => category.name === path).products;

      return (
        products.map(product => {
          const currentCurrencyPrice = product.prices.find(currency => currency.currency.symbol === this.props.currency)

          return <Product data={product} price={currentCurrencyPrice} key={product.id} />
        })
      )
  }


  
  render() {
    const { pathname } = this.props.location
    const path = pathname.split('').splice(1, pathname.length - 1).join('')
    
    if(this.state.isLoading) return <h1 className={styles.loadingText}>Loading...</h1> 

    return (
      <>
        <div className={styles.homePage}>
          {this.props.categories && (
            <>
              <Sidebar props={this.props}/>
              <div className={styles.container}>
                <h1>{path.toUpperCase()}</h1>
                <div className={styles.productsList}>{this.showProducts()}</div>
              </div>
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
    pageUserIsOn: state.pageUserIsOn,
    attributes: state.attributes
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