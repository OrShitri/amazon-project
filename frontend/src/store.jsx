import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import storeReducer from "./reducers/storeReducer";


const Store = createContext();

const initialState = {
    useInfo: localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo")) 
        : null ,
    cart: {
        cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [] ,
        shippingAddress: localStorage.getItem("shippingAdress") 
        ? JSON.parse(localStorage.getItem("shippingAdress")) 
        : {} ,
        paymentMethod: localStorage.getItem("paymentMethod") 
        ? JSON.parse(localStorage.getItem("paymentMethod")) 
        : "" ,
    }
};

const StoreProvider = ({children}) => {  
    const [state,dispatch] = useReducer(storeReducer, initialState);
    const body = {state,dispatch};
    return (
    <Store.Provider value={body}>{children}</Store.Provider>
  )
}
StoreProvider.propTypes = {
    children: PropTypes.node,
}

export { StoreProvider, Store }