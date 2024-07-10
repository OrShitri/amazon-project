import { useContext, useEffect, useReducer } from 'react'
import { Store } from '../store'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions.jsx';
import axios from "axios";
import { getError } from "../utils.jsx";
import { toast } from 'react-toastify';
import orderPageReducer from '../reducers/orderPageReducer.jsx';

const OrderPage = () => {
    const {state: {userInfo}, dispatch:ctxDispatch} = useContext(Store);
    const params = useParams();
    const {id: orderId} = params;
    const navigate = useNavigate();

    const [{loading,error,order},dispatch] = useReducer(orderPageReducer, {loading: true, order: null, error: ""});

    useEffect(() => {
        const getOrder = async () => {
            dispatch({type: GET_REQUEST});
            try {
                const {data} = await axios.get(`/api/v1/orders/${orderId}`, 
                    { headers: {authorization: `Bearer ${userInfo.token}`}});
                    dispatch({ type: GET_SUCCESS, payload: data})
            } catch (err) {
                dispatch({ type: GET_FAIL, payload: getError(err)});
                toast.error(getError(err));
            }
        };

        if(!userInfo) {
            navigate('/signin');
        }
        if(!order || (order._id && orderId !== order._id)) {
            getOrder();
        }
    }, [navigate, order, orderId, userInfo])
  return (
    <div>OrderPage</div>
  )
}

export default OrderPage