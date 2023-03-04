import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "../Styles/Sidebar.module.css"

class Sidebar extends PureComponent {
    state = {
        attributes: {},
        chosenColor: "",
        isColorChosen: false
    }


    componentDidMount() {
        const { history, location } = this.props.props

        const searchParams = new URLSearchParams(location.search);
        history.push(`?${searchParams.toString()}`);

        const sizeURLFirstParam = searchParams?.get("size")?.split(",")[0]
        const sizeURLSecondParam = searchParams?.get("size")?.split(",")[1]
        const capacityURLParam = searchParams.get("capacity")
        const withUSB3PortsParam = searchParams.get("withUSB3Ports")
        const touchIDInKeyboardParam = searchParams.get("touchIDInKeyboard")
        const colorURLFirstParam = searchParams?.get("color")?.split(",")[0]
        const colorURLSecondParam = searchParams?.get("color")?.split(",")[1]

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,

                "size": sizeURLFirstParam === "" ||
                    sizeURLFirstParam === undefined ?
                    undefined
                    :
                    {
                        id: sizeURLFirstParam,
                        value: sizeURLSecondParam,
                        displayValue: sizeURLFirstParam
                    },

                "capacity": capacityURLParam === null ||
                    capacityURLParam === "" ?
                    undefined
                    :
                    {
                        id: capacityURLParam,
                        value: capacityURLParam,
                        displayValue: capacityURLParam
                    },
                "withUSB3Ports": withUSB3PortsParam === "" ||
                    withUSB3PortsParam === null ?
                    undefined
                    :
                    {
                        id: withUSB3PortsParam,
                        value: withUSB3PortsParam,
                        displayValue:
                            withUSB3PortsParam
                    },
                "touchIDInKeyboard": touchIDInKeyboardParam === "" ||
                    touchIDInKeyboardParam === null ?
                    undefined
                    :
                    {
                        id: touchIDInKeyboardParam,
                        value: touchIDInKeyboardParam,
                        displayValue: touchIDInKeyboardParam
                    },
                "color": colorURLFirstParam === "" ||
                    colorURLFirstParam === undefined ?
                    undefined
                    :
                    {
                        id: colorURLFirstParam,
                        value: colorURLSecondParam,
                        displayValue: colorURLFirstParam
                    }
            },
        }), () => this.props.attributesChange(this.state.attributes))
    }


    handleSizeChange(e) {
        const { value, name } = e.target;
        const { history, location } = this.props.props;
        const selectedOption = e.target.options[e.target.selectedIndex];
        const datasetValue = selectedOption.dataset.value;

        const searchParams = new URLSearchParams(location.search);
        value === "" ? searchParams.delete(name) : searchParams.set(name, [value, datasetValue])
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [name]: value === "" ? undefined : { id: value, value: datasetValue, displayValue: value }
            },
        }), () => this.props.attributesChange(this.state.attributes))

    }


    handleCapacityChange(e) {
        const { value, name } = e.target;
        const { history, location } = this.props.props;

        const searchParams = new URLSearchParams(location.search);
        value === "" ? searchParams.delete(name) : searchParams.set(name, value)
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [name]: value === "" ? undefined : { id: value, value: value, displayValue: value }
            },
        }), () => this.props.attributesChange(this.state.attributes))

    }



    handleWithUSB3PortsOptionChange = (e) => {
        const { value, name } = e.target;
        const { history, location } = this.props.props;

        const searchParams = new URLSearchParams(location.search);
        searchParams.set(name, value);
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [name]: { id: value, value: value, displayValue: value }
            },
        }), () => this.props.attributesChange(this.state.attributes))
    }


    handleWithoutUSB3PortsOptionChange = (e) => {
        const { name } = e.target;
        const { history, location } = this.props.props;

        const searchParams = new URLSearchParams(location.search);
        searchParams.delete(name);
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [name]: undefined
            },
        }), () => this.props.attributesChange(this.state.attributes))
    }



    handleTouchIDInKeyboardOptionChange = (e) => {
        const { value, name } = e.target;
        const { history, location } = this.props.props;

        const searchParams = new URLSearchParams(location.search);
        searchParams.set(name, value);
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [name]: { id: value, value: value, displayValue: value }
            },
        }), () => this.props.attributesChange(this.state.attributes))
    }



    handleNoTouchIDInKeyboardOptionChange = (e) => {
        const { name } = e.target;
        const { history, location } = this.props.props;

        const searchParams = new URLSearchParams(location.search);
        searchParams.delete(name);
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [name]: undefined
            },
        }), () => this.props.attributesChange(this.state.attributes))
    }


    handleColorChange(e) {
        const { value, name, dataset } = e.target;
        const { history, location } = this.props.props;
        const datasetValue = dataset.value;
        const searchParams = new URLSearchParams(location.search);
        this.state.isColorChosen && this.state.chosenColor === value ? searchParams.delete(name) : searchParams.set(name, [value, datasetValue]);
        history.push(`?${searchParams.toString()}`);

        this.setState(prevState => ({
            isColorChosen: value === this.state.chosenColor ? false : true,
            chosenColor: value === this.state.chosenColor ? "" : value,
            attributes: {
                ...prevState.attributes,
                [name]: value === "" || (this.state.isColorChosen && this.state.chosenColor === value) ? undefined : { id: value, value: datasetValue, displayValue: value }
            },
        }), () => this.props.attributesChange(this.state.attributes))
    }



    render() {
        const { location } = this.props.props;
        const searchParams = new URLSearchParams(location.search);
        const sizeURLParam = searchParams?.get("size")?.split(",")[0];
        const capacityURLParam = searchParams.get("capacity");
        const withUSB3PortsParam = searchParams.get("withUSB3Ports");
        const touchIDInKeyboardParam = searchParams.get("touchIDInKeyboard")
        const colorURLParam = searchParams?.get("color")?.split(",")[0];
        const { categories } = this.props.props;
        const items = categories[0]?.products[2]?.attributes[0]?.items;


        const colorClassName = (id) => {
            if ((id === this.state.chosenColor && this.state.isColorChosen) || id === colorURLParam) {
                return styles.chosenColorOption;
            }
            return styles.colorOption;
        };

        return (
            <div className={styles.sidebar}>
                <div className={styles.sizeFilter}>
                    <label htmlFor="size-select">Size</label>
                    <select name="size" value={sizeURLParam} id="size-select" onChange={(e) => this.handleSizeChange(e)}>
                        <option value="">--Choose a size--</option>
                        <option value="40" data-value="40">40</option>
                        <option value="41" data-value="41">41</option>
                        <option value="42" data-value="42">42</option>
                        <option value="43" data-value="43">43</option>
                        <option value="Small" data-value="S">S / Small</option>
                        <option value="Medium" data-value="M">M / Medium</option>
                        <option value="Large" data-value="L">L / Large</option>
                        <option value="Extra Large" data-value="XL">XL / Extra Large</option>
                    </select>
                </div>

                <div className={styles.capacityFilter}>
                    <label htmlFor="capacity-select">Capacity</label>
                    <select name="capacity" value={capacityURLParam || undefined} id="capacity-select" onChange={(e) => this.handleCapacityChange(e)}>
                        <option value="">--Choose a capacity--</option>
                        <option value="256GB">256GB</option>
                        <option value="512GB">512GB</option>
                        <option value="512G">512G</option>
                    </select>
                </div>

                <div className={styles.withUSB3PortsFilter}>
                    <p>With USB 3 Ports</p>
                    <div className={styles.options}>
                        <div className={styles.singleOption}>
                            <input type="checkbox" id="withUSB3Ports" name="withUSB3Ports" value="Yes" checked={withUSB3PortsParam !== null} onChange={(e) => this.handleWithUSB3PortsOptionChange(e)} />
                            <label htmlFor="withUSB3Ports">Yes</label>
                        </div>
                        <div className={styles.singleOption}>
                            <input type="checkbox" id="withoutUSB3Ports" name="withUSB3Ports" value="No" checked={withUSB3PortsParam === "" || withUSB3PortsParam === null} onChange={(e) => this.handleWithoutUSB3PortsOptionChange(e)} />
                            <label htmlFor="withoutUSB3Ports">No</label>
                        </div>
                    </div>
                </div>

                <div className={styles.touchIDInKeyboard}>
                    <p>Touch ID In Keyboard</p>
                    <div className={styles.options}>
                        <div className={styles.singleOption}>
                            <input type="checkbox" id="touchIDInKeyboard" name="touchIDInKeyboard" value="Yes" checked={touchIDInKeyboardParam !== null} onChange={(e) => this.handleTouchIDInKeyboardOptionChange(e)} />
                            <label htmlFor="touchIDInKeyboard">Yes</label>
                        </div>
                        <div className={styles.singleOption}>
                            <input type="checkbox" id="noTouchIDInKeyboard" name="touchIDInKeyboard" value="No" checked={touchIDInKeyboardParam === "" || touchIDInKeyboardParam === null} onChange={(e) => this.handleNoTouchIDInKeyboardOptionChange(e)} />
                            <label htmlFor="noTouchIDInKeyboard">No</label>
                        </div>
                    </div>
                </div>

                <div className={styles.colorFilter}>
                    <p>Color: {this.state.chosenColor || colorURLParam}</p>
                    <div className={styles.colors}>
                        {items && items.map((item) => {
                            return (
                                <button
                                    style={{
                                        backgroundColor: item.value,
                                        borderColor: colorClassName(item.id)
                                    }}
                                    value={item.id}
                                    data-value={item.value}
                                    name="color"
                                    className={colorClassName(item.id)}
                                    key={item.id}
                                    onClick={(e) => this.handleColorChange(e)}
                                >
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        attributes: state.attributes
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        attributesChange: (attributes) => dispatch({ type: "ATTRIBUTES_UPDATE", attributes: attributes }),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)