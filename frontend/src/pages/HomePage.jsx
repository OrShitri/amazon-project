import { useEffect, useReducer } from "react"
import Title from "../components/shared/Title.jsx"
import homePageReducer from "../reducers/homePageReducer.jsx";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions.jsx";
import axios from "axios";
import Loading from "../components/shared/Loading.jsx";
import MessageBox from "../components/shared/MessageBox.jsx";
import Products from "../components/homePage/Products.jsx";

const initialState = {
    loading: true,
    error: "",
    products: [],
}

const HomePage = () => {

    const [state, dispatch] = useReducer(homePageReducer, initialState);
    useEffect(() => {
        const getProducts = async () => {
            dispatch({type: GET_REQUEST});
            
            try {
                const res = await axios.get("/api/v1/products");
                dispatch({type: GET_SUCCESS,payload: res.data});
               
            } catch (error) {
                 dispatch({type:GET_FAIL, payload: error.message})
            }
        }

        getProducts();
    }, [])

    return (
        <div>
            <Title title="HomePage"/>
            <div className="backgroundHomePage">
                <img
                    style={{ width: "100%" }}
                    src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg"
                    alt="bacgroundHomePage"
                />
            </div>
            <div className="products">
                {state.loading ? (<Loading />) :
                    state.error ? (<MessageBox variant="danger">{state.error}</MessageBox>) : (
                        <Products products={state.products}/>
                    )}
            </div>
        </div>
    )
}

export default HomePage;