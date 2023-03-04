import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import logo from "../Static/logo.svg";
import { connect } from "react-redux";
import MiniBag from "./MiniBag";
import NavbarRightSide from "./NavbarRightSide";
import NavbarLeftSide from "./NavbarLeftSide";

class Navbar extends PureComponent {
  
  state = {
    navCategories: []
  }
  
  static getDerivedStateFromProps(props, state) {
    return{
      navCategories: props.navCategories
    }
  }

  handleCurrency = (e) => {
    this.props.changeCurrency(e.target.value);
  };


  updateClassName = (el) => {
    return [styles.category, el.name === this.props.path && styles.categoryClicked].join(' ')
  }


  updateItemsQuantityBadge = () => {
    return this.props.bagItems.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0)
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <NavbarLeftSide location={this.props.location} history={this.props.history} navCategories={this.state.navCategories}/>

        <Link to="/all" onClick={() => this.props.detectLocation("/all")}>
          <img src={logo} alt="logo icon" width="38" className={styles.logo} />
        </Link>

        <NavbarRightSide />

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
