import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/Product.module.css"

import ProductOptions from './ProductOptions'

import { connect } from 'react-redux'
import { store } from '../Redux/store'

class Product extends PureComponent {
  constructor(props) {
    super(props)

    const { currency } = store.getState();

    this.state = {
      currency: currency,
      isButtonVisible: false
    }
  }

  componentDidMount() {
    const { currency } = store.getState();

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        currency: currency,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const currentCurrencyPrice = this.props.data.prices.find(currency => currency.currency.symbol === this.props.currency);


    return (
      <div className={[styles.container, !this.props.data.inStock && styles.outOfStock].join(' ')}
        onMouseEnter={() => {
          this.setState({ isButtonVisible: true })
        }}

        onMouseLeave={() => {
          this.setState({ isButtonVisible: false })
        }}

      >

        <Link to={`/product/${this.props.data.id}`} className={styles.productImgWrapper}>
          <img
            src={this.props.data.gallery[0]}
            height="300"
            width="auto"
            title={this.props.data.name}
            className={styles.productImg}
            onClick={() => [this.props.changeProductID(this.props.data.id), localStorage.setItem('productid', this.props.data.id)]}
            alt="product img"
          />
        </Link>



        <div className={styles.details}>

          <h4>{this.props.data.name}</h4>

          <h5>
            {this.props.data.inStock ?
              <>
                {currentCurrencyPrice.currency.symbol}
                {currentCurrencyPrice.amount}
              </>
              :
              ""
            }
            { }
          </h5>
          <ProductOptions
            data={this.props.data}
            isButtonVisible={this.state.isButtonVisible}
          />

        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeProductID: (productID) => dispatch({ type: "PRODUCT_ID_UPDATE", productID: productID }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)