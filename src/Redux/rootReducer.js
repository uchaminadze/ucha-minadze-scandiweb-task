const currentID = window.location.pathname.split('/')[2]
const preferredCurrency = localStorage.getItem('preferredCurrency')
const initialState = {
    category: "all",
    categories: [],
    productID: currentID,
    currency: preferredCurrency || "USD",
    bag: JSON.parse(localStorage.getItem("bag")) || [],
    isMiniBagOpen: false,
    locationPath: "",
}

const rootReducer = (state = initialState, action) => {

    
    

    if(action.type === "CATEGORY_UPDATE"){
        return {
            ...state,
            category: action.category
        }
    }

    if(action.type === "CURRENCY_UPDATE"){
        return {
            ...state,
            currency: action.currency
        }
    }

    if(action.type === "PRODUCT_ID_UPDATE"){
        return {
            ...state,
            productID: action.productID
        }
    }

    if(action.type === "ADD_TO_BAG"){        
        const matchingProducts = state.bag.find((el)=> JSON.stringify(el.attributes) === JSON.stringify(action.product.attributes))
        if(matchingProducts){
            matchingProducts.quantity++
            localStorage.setItem("bag", JSON.stringify(state.bag,matchingProducts))
        }else{
            localStorage.setItem("bag", JSON.stringify([...state.bag, action.product]))
            return {
                ...state,
                bag: [...state.bag, action.product]
            }
        }
    }

    if(action.type === "CLEAR_BAG"){
        localStorage.removeItem("bag")
        return {
            ...state,
            bag: []
        }
    }

    if(action.type === "REMOVE_BAG_ITEM"){
        const newBag = state.bag.filter(bagItem => bagItem.id !== action.id)
        localStorage.setItem("bag", JSON.stringify(newBag))

        return {
            ...state,
            bag: newBag
        }
    }

    if(action.type === "QUANTITY_INC"){        
        
        const newBag = state.bag.map(item=>{
            if(item.id===action.id){
                if(item.quantity < 10){
                    return{
                        ...item,
                        quantity: Number(item.quantity)+1
                    } 
                } else return item
                

            } else return item
        })
        
        localStorage.setItem("bag", JSON.stringify(newBag))
        
        return {
            ...state,
            bag: newBag
        }
    }

    if(action.type === "QUANTITY_DEC"){        
        
        const newBag = state.bag.map(item=>{
            if(item.id===action.id){
                if(item.quantity > 1){
                    return{
                        ...item,
                        quantity: Number(item.quantity)-1
                    } 
                } else return item
                

            } else return item
        })
        
        
        localStorage.setItem("bag", JSON.stringify(newBag))
        
        return {
            ...state,
            bag: newBag
        }
    }

    if(action.type === "MINI_BAG_OPEN"){
        return {
            ...state,
            isMiniBagOpen: !action.isMiniBagOpen
        }
    }

    if(action.type === "CHANGED_LOCATION_PATH"){
        return {
            ...state,
            locationPath: action.locationPath
        }
    }

    if(action.type === "CATEGORIES"){
        return {
            ...state,
            categories: action.categories
        }
    }

    else return state
    

}

export default rootReducer