import React, { Component } from 'react'
import ProductOptions from '../Components/ProductOptions'
import styles from "../Styles/ProductDetails.module.css"

import { gql } from "@apollo/client"

import { Query } from '@apollo/client/react/components'

import { store } from '../Redux/store';
import { connect } from 'react-redux'

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productID: store.getState().productID,
      currency: store.getState().currency,
      imageIndex: 0,
      locationPath: store.getState().locationPath
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ productID: store.getState().productID, currency: store.getState().currency, locationPath: store.getState().locationPath })
    })
    this.props.detectLocation(this.props.location.pathname)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleImage = (index) => {
    this.setState({ imageIndex: index })
  }

  render() {
    const GET_DATA = gql`{
      product(id : ${JSON.stringify(this.state.productID)}){
        name
        description
        brand
        inStock
        gallery
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          id
          __typename @skip(if: true)
          name
          type
          items{
            id
            __typename @skip(if: true)
            displayValue
            value
          }
        }
      }
    }`;

    return (
      <Query query={GET_DATA}>
        {({ data, loading, error }) => {

          if (error) return <h1 style={{ textAlign: "center", margin: "10rem" }}>An Error Occured.</h1>

          if (loading) return <h1 style={{ textAlign: "center", margin: "10rem" }}>Loading...</h1>

          else {
            const currentCurrencyPrice = data.product.prices.find(currency => currency.currency.symbol === this.state.currency)
            return (
              <div className={styles.container}>


                <div className={styles.productImages}>
                  <br />
                  <div className={styles.productPreview}>
                    {data.product.gallery.map((image, index) => {
                      return <img src={image} key={image} width="auto" alt="" height="100" onClick={() => this.handleImage(index)} />
                    })}
                  </div>
                  <img src={data.product.gallery[this.state.imageIndex]} alt={data.product.name} height="400" />
                </div>

                <div className={styles.productInfo}>
                  <div>
                    <h3><b>{data.product.brand}</b></h3>
                    <h1>{data.product.name}</h1>
                  </div>


                  <ProductOptions data={data.product} symbol={currentCurrencyPrice.currency.symbol} amount={currentCurrencyPrice.amount} />


                  <div dangerouslySetInnerHTML={{ __html: data.product.description }}></div>

                </div>



              </div>
            );
          }
        }
        }
      </Query>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    detectLocation: (locationPath) => dispatch({ type: "CHANGED_LOCATION_PATH", locationPath: locationPath })
  };
};



export default connect(null, mapDispatchToProps)(ProductDetails);