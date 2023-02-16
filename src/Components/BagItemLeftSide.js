import { PureComponent } from "react";
import styles from "../Styles/BagItem.module.css";

class BagItemLeftSide extends PureComponent {
    render() {
        return (
            <div className={styles.productDetails}>
                <div>
                    <h4>{this.props.data.brand}</h4>
                    <h3>{this.props.data.name}</h3>
                    {this.props.price?.currency && (
                        <h4>
                            {this.props.price?.currency.symbol}
                            {this.props.price?.amount}
                        </h4>
                    )}
                </div>

                {this.props.data.allAttributes.map((el, index) => {
                    return (
                        <div key={index}>
                            <span>{el.name}</span>
                            <div className={styles.chosenAttributes}>
                                {this.props.data.attributes[el.name] && el.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {el.type === "swatch" ?
                                                <button
                                                    style={{ background: item.value }}
                                                    className={this.props.data.attributes[el.name] === item.displayValue ?
                                                        styles.selectedSwatch : styles.swatch
                                                    }
                                                ></button>
                                                :
                                                <button
                                                    className={
                                                        this.props.data.attributes[el.name] === item.displayValue ?
                                                            styles.selectedTextAttribute : styles.textAttribute
                                                    }
                                                >
                                                    {item.value}
                                                </button>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}


export default BagItemLeftSide;