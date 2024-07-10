import { useContext } from "react"
import { Store } from "../store"
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL, REMOVE_FROM_CART } from "../actions";
import { getError } from "../utils";
import axios from "axios";
import Title from "../components/shared/Title";
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import ItemsInCart from "../components/cart/ItemsInCart";
import Checkout from "../components/cart/Checkout";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const {state,dispatch:ctxDispatch} = useContext(Store);
    const {cart: {cartItems}} = state;
    const navigate = useNavigate();
    //Navigation and redirection


    const updateCartHandler = async (item, quantity) => {
        try {
            const {data:product} = await axios.get(`/api/v1/products/${item._id}`);

            if(product.countInStock < quantity){
                toast.error("Sorry, Product is not of stock.");
                return;
            }
            ctxDispatch({
                type:ADD_TO_CART,
                payload:{...item,quantity},
            });

        } catch (error) {
            ctxDispatch({type: GET_FAIL, payload:error.message});
            toast.error(getError(error));
        }
    }

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: REMOVE_FROM_CART,
            payload: item,
        })
    }
    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    }
    return (
        <div>
            <Title title="Shopping Cart"/>
            <Row>
                <Col md={8}>
                    <ItemsInCart updateCartHandler={updateCartHandler} cartItems={cartItems} removeItemHandler={removeItemHandler}/>
                </Col>

                <Col md={4}>
                    <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler}/>
                </Col>
            </Row>
        </div>
  )
}

export default CartPage