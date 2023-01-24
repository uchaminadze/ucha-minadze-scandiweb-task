import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { PureComponent } from "react";
import { connect } from "react-redux";

class ExactProduct extends PureComponent {
  render(){
    const EXACT_PRODUCT = gql`{
      product(id : ${JSON.stringify(this.props.productId)}){
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
    return(
      <Query query={EXACT_PRODUCT}>{this.props.children}</Query>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    productId: state.productID
  }
}


export default connect(mapStateToProps, null)(ExactProduct);