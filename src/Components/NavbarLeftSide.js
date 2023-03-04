import { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

class NavbarLeftSide extends PureComponent {

    state = {
        categories: []
    }

    static getDerivedStateFromProps(props, state) {
        return {
            categories: props.navCategories
        }
    }

    updateClassName = (el) => {
        return [styles.category, el.name === this.props.path && styles.categoryClicked].join(' ')
    }

    render() {
        const {search} = this.props.location;
        return (
            <div className={styles.categories} >
                {
                    this.state?.categories?.map((el, index) => {
                        return (
                            <span
                                onClick={() => [this.props.changeCategory(el.name), this.props.detectLocation(`/${el.name}`)]}
                                key={index}
                            >
                                <Link to={`/${el.name}${search}`} key={index} className={this.updateClassName(el)} onClick={() => this.props.detectLocation(el.name)}>{el.name}</Link>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NavbarLeftSide);