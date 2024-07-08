import { useContext } from "react"
import { Store } from "../store"
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from "../actions";
import { getError } from "../utils";
import axios from "axios";
import Title from "../components/shared/Title";
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import ItemsInCart from "../components/cart/ItemsInCart";


const CartPage = () => {
    const {state,dispatch:ctxDispatch} = useContext(Store);
    const {cart: {cartItems}} = state;
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

    //const removeItemHandler
    return (
        <div>
            <Title title="Shopping Cart"/>
            <Row>
                <Col md={8}>
                    <ItemsInCart updateCartHandler={updateCartHandler} cartItems={cartItems}/>
                </Col>

                <Col md={4}>
                    {/* <Checkout  cartItems={cartItems}/> */}
                </Col>
            </Row>
        </div>
  )
}

export default CartPage