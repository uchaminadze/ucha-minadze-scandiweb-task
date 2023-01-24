import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { store } from '../Redux/store';
import styles from '../Styles/Product.module.css';

class ProductOptions extends PureComponent {

  constructor(props) {
    super(props)

    const {locationPath} = store.getState();

    this.state = {
      product: {
        attributes: {}
      },
      locationPath: locationPath,
      chosenSize: "",
      chosenColor: "",
      chosenUsbOption: "",
      chosenTouchId: "",
      chosenCapacity: ""
    }
  }

  createProductObject = () => {
    const product = {
      name: this.props.data.name,
      prices: this.props.data.prices,
      image: this.props.data.gallery,
      brand: this.props.data.brand,
      quantity: 1,
      id: Math.floor(Math.random() * 1000),
      attributes: {},
      allAttributes: this.props.data.attributes.map((item)=>{
        return item
      })
    }

    this.props.data.attributes.forEach(attribute => {
      product.attributes[attribute.name] = attribute.items[0].displayValue
    });

    this.setState({
      product: product
    })
  }

  componentDidMount() {
    const {locationPath} = store.getState();

    this.unsubscribe = store.subscribe(()=>{
      this.setState({
        locationPath: locationPath 
      })
    })

    this.createProductObject();
    console.log('this.props.chosenColor :>> ', this.props.chosenColor);
    this.setState({
      chosenSize: this.props.chosenSize,
      chosenColor: this.props.chosenColor,
      chosenUsbOption: this.props.chosenUsbOption,
      chosenTouchId: this.props.chosenTouchId,
      chosenCapacity: this.props.chosenCapacity
    })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  

  handleChoice = (attributeName, itemID) => {
    this.setState({
        product: {
          ...this.state.product,
  
          attributes: {
            ...this.state.product.attributes,
            [attributeName]: itemID,
          }
        }
    })
  }

  handleBag = () => {

    this.props.addtoBag(this.state.product);

    this.setState({
      chosenSize: this.props.chosenSize,
      chosenColor: this.props.chosenColor,
      chosenUsbOption: this.props.chosenUsbOption,
      chosenTouchId: this.props.chosenTouchId,
      chosenCapacity: this.props.chosenCapacity
    });

    this.createProductObject();
  }

  render() {
    console.log(this.props.attributes)
    return (
      <div className={styles.productDetails}>
        {this.props.data.attributes.map((attribute, index) => {
          return (
            <div key={index}>
              {this.props.data.inStock &&
               this.state.locationPath !== "/all" && 
               this.state.locationPath !== "/clothes" && 
               this.state.locationPath !== "/tech" && 
               <div key={attribute.name}>

                <span key={attribute.name} className={styles.productOptionName}>{attribute.name}: <b>{this.state.product.attributes[attribute.name]}</b></span>
                <br />

                
              <div className={styles.productOptions}>
                {attribute.name === "Capacity" && attribute.items.map((item) => {
                  return (
                    <button
                      style={{
                        backgroundColor: item.displayValue === this.state.chosenCapacity ? "black" : "white",
                        color: item.displayValue === this.state.chosenCapacity ? "white" : "black",
                        border: "1px solid black"
                      }}
                      className={styles.productAttribute}
                      key={item.id}
                      onClick={(e) => this.handleChoice(attribute.name, item.id, this.setState({chosenCapacity: e.target.innerText}))}
                    >
                      {item.displayValue}
                    </button>
                  );
                })}

                {attribute.name === "Size" && attribute.items.map((item) => {
                  return (
                    <button
                      style={{
                        backgroundColor: item.value === this.state.chosenSize ? "black" : "white",
                        color: item.value === this.state.chosenSize ? "white" : "black",
                        border: "1px solid black"
                      }}
                      className={styles.productAttribute}
                      key={item.id}
                      onClick={(e) => this.handleChoice(attribute.name, item.id, this.setState({chosenSize: e.target.innerText}))}
                    >
                      {item.value}
                    </button>
                  );
                })}

                {attribute.name === "Color" && attribute.items.map((item) => {
                  return (
                    <button
                      style={{
                        backgroundColor: item.value,
                        border: item.displayValue === this.state.chosenColor ? "2px solid #5ECE7B" : "2px solid black",
                        width: "2.3rem", height: "2rem"
                      }}
                      key={item.id}
                      onClick={(e) => this.handleChoice(attribute.name, item.id, this.setState({chosenColor: item.displayValue}))}
                    >
                    </button>
                  );
                })}

                {attribute.name === "With USB 3 ports" && attribute.items.map((item) => {
                  return (
                    <button
                      style={{
                        backgroundColor: item.value === this.state.chosenUsbOption? "black" : "white",
                        color: item.value === this.state.chosenUsbOption ? "white" : "black",
                        border: "1px solid black"
                      }}
                      className={styles.productAttribute}
                      key={item.id}
                      onClick={(e) => this.handleChoice(attribute.name, item.id, this.setState({chosenUsbOption: item.value}))}
                    >
                      {item.value}
                    </button>
                  );
                })}

                {attribute.name === "Touch ID in keyboard" && attribute.items.map((item) => {
                  return (
                    <button
                      style={{
                        backgroundColor: item.value === this.state.chosenTouchId ? "black" : "white",
                        color: item.value === this.state.chosenTouchId ? "white" : "black",
                        border: "1px solid black"
                      }}
                      className={styles.productAttribute}
                      key={item.id}
                      onClick={(e) => this.handleChoice(attribute.name, item.id, this.setState({chosenTouchId: item.value}))}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
              </div>}
            </div>

          );
        })}
        
        {!this.props.data.inStock && <span className={styles.outOfStockText} >out of stock</span>}

        {this.props.data.inStock && 
        this.state.locationPath !== "/all" &&
        this.state.locationPath !== "/clothes" &&
        this.state.locationPath !== "/tech" && 
          <span className={styles.productOptionName}>Price:</span>}

        {this.props.data.inStock ?
         <h2 style={{fontSize: "20px"}}>{this.props.symbol}{this.props.amount}</h2> 
         : 
         <h2 style={{fontSize: "20px"}}>Out of stock</h2>
        }
          
      
          

        {this.props.data.inStock && 
        this.state.locationPath !== "/all" && 
        this.state.locationPath !== "/clothes" && 
        this.state.locationPath !== "/tech" && 
        <button onClick={this.handleBag} className={styles.addToBagProductDetails}>
          add to bag
        </button>}

        {this.props.data.inStock && this.props.isButtonVisible && <button onClick={this.handleBag} className={styles.addToBag}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87365L19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22266L18.6566 6.22252Z" fill="#43464E" />
            <path d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9812 8.44437 14.9812V14.9814ZM8.44437 17.9011C7.9599 17.9011 7.58071 17.5385 7.58071 17.0752C7.58071 16.6119 7.9599 16.2493 8.44437 16.2493C8.92885 16.2493 9.30804 16.6119 9.30804 17.0752C9.30722 17.5188 8.90748 17.9011 8.44437 17.9011Z" fill="#43464E" />
            <path d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z" fill="#43464E" />
          </svg>
        </button>}

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
     chosenSize: props.data?.attributes[0]?.items.map((el) => el)[0].value,
     chosenColor: props.data?.attributes[1]?.items.map((el) => el)[0].displayValue,
     chosenUsbOption: props.data?.attributes[0]?.items.map((el) => el)[0].displayValue,
     chosenTouchId: props.data?.attributes[0]?.items.map((el) => el)[0].displayValue,
     chosenCapacity: props.data?.attributes[0]?.items.map((el) => el)[0].displayValue
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addtoBag: (product) => dispatch({ type: "ADD_TO_BAG", product }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions)