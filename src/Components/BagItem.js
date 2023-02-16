import React, { PureComponent } from "react";
import { store } from "../Redux/store";
import styles from "../Styles/BagItem.module.css";
import BagItemLeftSide from "./BagItemLeftSide";
import BagItemRightSide from "./BagItemRightSide";

class BagItem extends PureComponent {
  constructor(props) {
    super(props)

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


    if (index < 1) {
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

    if (index === length) {
      index = -1;
    }

    index = index + 1;

    this.setState({
      current: index,
    });
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <BagItemLeftSide data={this.props.data} price={this.props.price} />

          <BagItemRightSide
            quantity={this.props.data.quantity}
            current={this.state.current}
            image={this.props.data.image}
            id={this.props.data.id}
            handlerPrev={this.handlerPrev}
            handlerNext={this.handlerNext}
          />
        </div>
      </>
    );
  }
}

export default BagItem;
