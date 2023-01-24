import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import BagItem from "./BagItem";
import styles from "../Styles/MiniBag.module.css";
import { Link } from "react-router-dom";
import { store } from "../Redux/store";

class MiniBag extends PureComponent {
  constructor(props) {
    super(props);

    const {isMiniBagOpen} = store.getState();

    this.state = {
      isMiniBagOpen: isMiniBagOpen,
    };
  }

  
  componentDidMount(){
    const {category, currency, isMiniBagOpen} = store.getState();
    
    this.unsubscribe = store.subscribe(()=>{
      this.setState({category: category, currency: currency, isMiniBagOpen: isMiniBagOpen})
    })
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  
  myRef = createRef();

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.props.showMiniBag(this.state.isMiniBagOpen)
    }
  };
  componentWillUnmount(){
    this.unsubscribe();
    document.removeEventListener("mousedown", this.handleClickOutside);
  }




  
  render() {
    const totalPrices = [];

    return (
      <div className={styles.backdrop} >
        <div className={styles.minibag} ref={this.myRef}>
          <h1>
            My Bag: {this.props.bagItems.reduce(function(prev, cur) {
                return prev + cur.quantity;
            }, 0)} items
          </h1>

          <div className={styles.items}>
            {this.props.bagItems.map((item) => {
              const currentCurrencyPrice = item?.prices?.find(
                (currency) => currency.currency.symbol === this.props.currency
              );
              totalPrices.push(
                Math.ceil(item.quantity * currentCurrencyPrice?.amount)
              );
              return (
                <BagItem
                  key={item?.id}
                  price={currentCurrencyPrice}
                  data={item}
                />
              );
            })}
          </div>

          <div className={styles.totalPrice}>
            <h2 style={{ textAlign: "center" }}>
              Total:
            </h2>
            <h2>
              {this.props.currency} {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
            </h2>
          </div>

          <div className={styles.showFullBag}>
            <Link to="/bag" className={styles.viewBag} onClick={()=> this.props.showMiniBag(this.state.isMiniBagOpen)}>
              View Bag
            </Link>

            <button>Checkout</button>
          </div>
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
    showMiniBag: (isMiniBagOpen) =>
      dispatch({ type: "MINI_BAG_OPEN", isMiniBagOpen: isMiniBagOpen })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniBag);
