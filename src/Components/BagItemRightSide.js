import { PureComponent } from "react";
import styles from "../Styles/BagItem.module.css";
import deleteIcon from "../Static/delete.svg";
import leftArrow from '../Static/leftArrow.svg';
import rightArrow from '../Static/rightArrow.svg';
import { connect } from "react-redux";


class BagItemRightSide extends PureComponent {

    increment = () => {
        this.props.incrementQunatity(this.props.id);
    };

    decrement = () => {
        this.props.decrementQunatity(this.props.id);
    };

    removeItem = () => {
        this.props.removeItem(this.props.id);
    };
    render() {
        let index = this.props.current,
            length = this.props.image.length,
            src = this.props.image[index];

        return (
            <div className={styles.productShowCase}>
                <div className={styles.productQuantity}>
                    <button onClick={this.increment}>+</button>
                    <b>{this.props.quantity}</b>
                    <button onClick={this.decrement}>-</button>
                </div>
                <div className={styles.productImgContainer}>
                    <div className={styles.productImgSlider}>
                        <img
                            src={src}
                            key={index}
                            width="150"
                            height="auto"
                            alt="prod"
                        />
                    </div>
                    {length > !0 && <div className={styles.productImgArrows}>
                        <button className="carousel_control carousel_control__prev" onClick={this.props.handlerPrev}>
                            <img src={leftArrow} alt="left arrow" />
                        </button>
                        <button className="carousel_control carousel_control__next" onClick={this.props.handlerNext}>
                            <img src={rightArrow} alt="right arrow" />
                        </button>
                    </div>}
                </div>

                <button
                    onClick={this.removeItem}
                    className={styles.deleteButton}
                >
                    <img
                        src={deleteIcon}
                        width="32"
                        height="auto"
                        alt="trash can icon"
                    />
                </button>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        incrementQunatity: (id) => dispatch({ type: "QUANTITY_INC", id }),
        decrementQunatity: (id) => dispatch({ type: "QUANTITY_DEC", id }),
        removeItem: (id) => dispatch({ type: "REMOVE_BAG_ITEM", id }),
    };
};

export default connect(null, mapDispatchToProps)(BagItemRightSide);