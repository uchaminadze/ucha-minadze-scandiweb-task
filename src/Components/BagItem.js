import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { store } from "../Redux/store";
import styles from "../Styles/BagItem.module.css";
import deleteIcon from "../Static/delete.svg";
import leftArrow from '../Static/leftArrow.svg';
import rightArrow from '../Static/rightArrow.svg';

class BagItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.data.quantity,
      current: 0
    };

    this.handlerPrev = this.handlerPrev.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      const { bag } = store.getState();

      const x = this.props.data.id;

      const item = bag.find((item) => {
        return item.id === x;
      });

      this.setState({
        quantity: item?.quantity ? item?.quantity : 0,
      });
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  handlerPrev() {
    let index = this.state.current,
        length = this.props.data.image.length;
    
    if( index < 1 ) {
      index = length;
    }
    
    index = index - 1;
  
    this.setState({
      current: index,
    });
  }
  
  handlerNext() {
    let index = this.state.current,
        length = this.props.data.image.length - 1;
    
    if( index === length ) {
      index = -1;
    }
    
    index = index + 1;
    
    this.setState({
      current: index,
    });
  }

  increment = () => {
    this.props.incrementQunatity(this.props.data.id);
  };

  decrement = () => {
    this.props.decrementQunatity(this.props.data.id);
  };

  removeItem = () => {
    this.props.removeItem(this.props.data.id);
  };

  render() {
    let index = this.state.current,
        length = this.props.data.image.length,
        src = this.props.data.image[index];
        
        
    
    return (
      <>
        <div className={styles.container}>
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

          {this.props.data.allAttributes.map((el, index)=>{
            return(
              <div key={index}>
                <span>{el.name}</span>
                <div className={styles.chosenAttributes}>
                  {this.props.data.attributes[el.name] && el.items.map((item, index)=>{
                    return(
                      <div key={index}>
                        {el.type === "swatch" ? 
                          <button style={{background: item.value, width: "2.3rem", height: "2rem", border: this.props.data.attributes[el.name] === item.displayValue ? "2px solid #5ECE7B" : "2px solid black"}} ></button>
                          :
                          <button style={{background:this.props.data.attributes[el.name] === item.displayValue ? "black" : "white", border: "1px solid black", width: "4rem", height: "2rem", color: this.props.data.attributes[el.name] === item.displayValue ? "white" : "black"}} >{item.value}</button>
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

        </div>

        <div className={styles.productShowCase}>
          <div className={styles.productQuantity}>
            <button onClick={this.increment}>+</button>
              <b>{this.state.quantity}</b>
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
            {length >! 0 && <div className={styles.productImgArrows}>
              <button className="carousel_control carousel_control__prev" onClick={this.handlerPrev}>
                <img src={leftArrow} alt="left arrow"/>
              </button>
              <button className="carousel_control carousel_control__next" onClick={this.handlerNext}>
                <img src={rightArrow} alt="right arrow"/>
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
      </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQunatity: (id) => dispatch({ type: "QUANTITY_INC", id }),
    decrementQunatity: (id) => dispatch({ type: "QUANTITY_DEC", id }),
    removeItem: (id) => dispatch({ type: "REMOVE_BAG_ITEM", id }),
  };
};

export default connect(null, mapDispatchToProps)(BagItem);
