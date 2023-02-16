import { PureComponent } from "react";

class Utils extends PureComponent {
    calculateTotal = (totalPrices) => {
        return totalPrices.reduce((prev, nxt) => prev + nxt, 0)
    }

    calculatePrice = (item, propCurrency) => {
        return item?.prices?.find((currency) => currency.currency.symbol === propCurrency);
    }

    calculateNumberOfItems = (bagItems) => {
        return bagItems.reduce(function (prev, cur) {
          return prev + cur.quantity;
        }, 0)
    }

    render(){
        return [this.calculateTotal(), this.calculatePrice(), this.calculateNumberOfItems()]
    }
}

export default Utils;
