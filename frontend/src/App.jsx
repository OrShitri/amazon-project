import './App.css'
//import Title from './components/shared/Title.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import SignIn from './pages/SignIn';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';
import SignUp from './pages/SignUp';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentPage from './pages/PaymentPage';
import SubmitOrderPage from './pages/SubmitOrderPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <ToastContainer position="bottom-center" limit={1} /> 
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/products/:token" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<SubmitOrderPage />} />
              <Route path='/order/:id' element={<OrderPage />}/>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App