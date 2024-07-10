import { useNavigate, useParams } from "react-router-dom";
import { useContext, useReducer, useEffect } from "react";
import { Store } from "../store.jsx";
import productPageReducer from "../reducers/productPageReducer.jsx";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions.jsx";
import axios from "axios";
import { addToCartHandler, getError } from "../utils.jsx";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading.jsx";
import MessageBox from "../components/shared/MessageBox.jsx";
import { Col, Row } from "react-bootstrap";
import CartDescription from "../components/product/CartDescription.jsx";
import ProductDescription from "../components/product/ProductDescription.jsx";


const initialState = {
  loading: true,
  error: "",
  product: [],
};

const ProductPage = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const {
    dispatch: ctxDispatch,
    state: {
      cart: { cartItems },
    },
  } = useContext(Store);

  const [{ loading, error, product }, dispatch] = useReducer(
    productPageReducer,
    initialState,
  );

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
        toast(getError(err));
      }
    };
    getProduct();
  }, [token]);
  const addToCart = async () => {
    await addToCartHandler(product, cartItems, ctxDispatch);
    navigate("/cart");
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={product.image} alt={product.title} />
            </Col>
            <Col md={3}>
              <ProductDescription {...product} />
            </Col>
            <Col md={3}>
              <CartDescription product={product} addToCart={addToCart} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
