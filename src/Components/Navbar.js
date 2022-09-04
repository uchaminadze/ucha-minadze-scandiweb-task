import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import cart from "../Static/cart.svg";
import logo from "../Static/logo.svg";
import { connect } from "react-redux";
import { store } from "../Redux/store";
import MiniBag from "./MiniBag";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: store.getState().currency,
      isMiniBagOpen: store.getState().isMiniBagOpen,
      category: store.getState().category,
      categories: store.getState().categories,
      locationPath: store.getState().locationPath
    };

  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ currency: store.getState().currency, categories: store.getState().categories, isMiniBagOpen: store.getState().isMiniBagOpen, category: store.getState().category, locationPath: store.getState().locationPath });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCurrency = (e) => {
    localStorage.setItem("preferredCurrency", e.target.value);
    this.props.changeCurrency(e.target.value);
  };

  render() {
    return (
      this.state.locationPath !== "" && <nav className={styles.navbar}>
        <div className={styles.categories} >
        {
          this.state.locationPath === "/" ? 
          this.state.categories.map((el, index)=> {
            
            return(
              <span
                className={[styles.category, el.name === localStorage.getItem("category") && styles.categroyClicked].join(' ')}
                onClick={() => [this.props.changeCategory(el.name), localStorage.setItem("category", el.name)]}
                key={index}
              >
                {el.name}
              </span>
            )
          })
          :
          ["all", "clothes", "tech"].map((el, index)=> {
            
            return(
              <Link to="/" key={index} className={styles.category} style={{textDecoration: "none"}} onClick={() => localStorage.setItem("category", el)}>{el}</Link>
            )
          })
        }
      </div>


      <img src={logo} alt="logo icon" width="38" className={styles.logo} />

      <div className={styles.misc}>
        <select
          className={styles.currency}
          value={this.state.currency}
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
          onClick={() => this.props.showMiniBag(this.state.isMiniBagOpen)}
          aria-label="show shopping bag button"
        >
          <img src={cart} alt="shopping cart icon" />
          <span className={styles.badge}>{
            this.props.bagItems.reduce(function(prev, cur) {
              return prev + cur.quantity;
            }, 0)
          }</span>
        </button>
      </div>
      {this.state.isMiniBagOpen && <MiniBag />}
    </nav> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bagItems: state.bag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: "CATEGORY_UPDATE", category: category }),
    changeCurrency: (currency) =>
      dispatch({ type: "CURRENCY_UPDATE", currency: currency }),
    showMiniBag: (isMiniBagOpen) =>
      dispatch({ type: "MINI_BAG_OPEN", isMiniBagOpen: isMiniBagOpen })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
