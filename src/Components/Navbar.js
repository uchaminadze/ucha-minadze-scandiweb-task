import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import cart from "../Static/cart.svg";
import logo from "../Static/logo.svg";
import { connect } from "react-redux";
import MiniBag from "./MiniBag";

class Navbar extends PureComponent {
  
  handleCurrency = (e) => {
    this.props.changeCurrency(e.target.value);
  };
  
  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.categories} >
        {
          this.props.locationPath === "/all" ||
          this.props.locationPath === "/clothes" ||
          this.props.locationPath === "/tech" ?
          this.props.categories.map((el, index)=> {
            return(
              <span
                onClick={() => [this.props.changeCategory(el.name),this.props.detectLocation(`/${el.name}`)]}
                key={index}
              >
                <Link to={`/${el.name}`} key={index} className={[styles.category, el.name === this.props.path && styles.categoryClicked].join(' ')} style={{textDecoration: "none"}} onClick={() => this.props.detectLocation(el.name)}>{el.name}</Link>
              </span>
            )
          })
          :
          ["all", "clothes", "tech"].map((el, index)=> {
            
            return(
              <Link to={`/${el}`} key={index} className={styles.category} style={{textDecoration: "none"}}>{el}</Link>
            )
          })
        }
      </div>


      <Link to="/all" onClick={() => this.props.detectLocation("/all")}>
        <img src={logo} alt="logo icon" width="38" className={styles.logo} />
      </Link>

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
          <span className={styles.badge}>{
            this.props.bagItems.reduce(function(prev, cur) {
              return prev + cur.quantity;
            }, 0)
          }</span>
        </button>
      </div>
      {this.props.isMiniBagOpen && <MiniBag />}
    </nav> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bagItems: state.bag,
    categories: state.categories,
    isMiniBagOpen: state.isMiniBagOpen,
    currency: state.currency,
    locationPath: state.locationPath,
    path: state.locationPath.split('').splice(1, state.locationPath.length - 1).join('')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: "CATEGORY_UPDATE", category: category }),
    detectLocation: (locationPath) => 
      dispatch({ type: "CHANGED_LOCATION_PATH", locationPath: locationPath }),
    changeCurrency: (currency) =>
      dispatch({ type: "CURRENCY_UPDATE", currency: currency }),
    showMiniBag: (isMiniBagOpen) =>
      dispatch({ type: "MINI_BAG_OPEN", isMiniBagOpen: isMiniBagOpen })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
