import { PureComponent } from "react";
import styles from "../Styles/Navbar.module.css";
import { connect } from "react-redux";
import cart from "../Static/cart.svg";

class NavbarRightSide extends PureComponent {

  handleCurrency = (e) => {
    this.props.changeCurrency(e.target.value);
  };


  updateItemsQuantityBadge = () => {
    return this.props.bagItems.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0)
  }


  render() {
    return (
      <div className={styles.misc}>
        <select
          className={styles.currency}
          value={this.props.currency}
          onChange={this.handleCurrency}
        >
          <option className={styles.currencyOption} value="$">
            $
          </option>
          <option className={styles.currencyOption} value="£">
            £
          </option>
          <option className={styles.currencyOption} value="A$">
            A$
          </option>
          <option className={styles.currencyOption} value="¥">
            ¥
          </option>
          <option className={styles.currencyOption} value="₽">
            ₽
          </option>
        </select>

        <button
          onClick={() => this.props.showMiniBag(this.props.isMiniBagOpen)}
          aria-label="show shopping bag button"
        >
          <img src={cart} alt="shopping cart icon" />
          <span className={styles.badge}>{this.updateItemsQuantityBadge()}</span>
        </button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    bagItems: state.bag,
    isMiniBagOpen: state.isMiniBagOpen,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currency) =>
      dispatch({ type: "CURRENCY_UPDATE", currency: currency }),
    showMiniBag: (isMiniBagOpen) =>
      dispatch({ type: "MINI_BAG_OPEN", isMiniBagOpen: isMiniBagOpen })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarRightSide);