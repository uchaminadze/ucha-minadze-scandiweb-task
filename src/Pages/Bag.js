import React, { PureComponent } from "react";
import { connect } from "react-redux";
import BagItem from "../Components/BagItem";
import styles from '../Styles/Bag.module.css';
import Utils from "../Utils";

class Bag extends PureComponent {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.props.detectLocation(this.props.location.pathname);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clearBag = () => {
    this.props.clearBagItems();
  };

  render() {
    const totalPrices = [];
    const {
      calculateTotal,
      calculatePrice,
      calculateNumberOfItems
    } = new Utils();
    return (
      <div className={styles.bagContainer}>
        <h2>Cart</h2>
        <hr />
        <div>
          {this.props.bagItems.map((item) => {
            let currentCurrencyPrice = calculatePrice(item, this.props.currency)

            totalPrices.push(
              Math.ceil(item.quantity * currentCurrencyPrice.amount)
            );

            return (
              <div key={item.id}>
                <BagItem key={item.id} price={currentCurrencyPrice} data={item} />
                <hr />
              </div>
            );
          })}
        </div>

        <div className={styles.order}>
          <p>Quantity: <b>{calculateNumberOfItems(this.props.bagItems)}</b></p>

          <p>
            Total: <b>
              {calculateTotal(totalPrices)}{" "}
              {this.props.currency}
            </b>
          </p>
          <button
            onClick={this.clearBag}
            className={styles.orderButton}
          >
            Order
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bagItems: state.bag,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearBagItems: () => dispatch({ type: "CLEAR_BAG" }),
    detectLocation: (locationPath) => dispatch({ type: "CHANGED_LOCATION_PATH", locationPath: locationPath })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
