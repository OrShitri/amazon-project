import { Navbar, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";
import { Store } from "../../store.jsx";
import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { USER_SIGNOUT } from "../../actions.jsx";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems } = cart; // Correctly destructure cartItems from cart object
  const navigate = useNavigate();

  {
    console.log(`line 43 - cartItems ${cartItems.length} items`);
  }

  const signoutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazon logo"
              />
            </Navbar.Brand>{" "}
          </Link>
          {/*<SearchBox />*/}
          <SearchBox />
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
            <Link to="/cart" className="nav-link me-2">
              <i className="fa fa-shopping-cart text-white"></i>

              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </nav>
          {userInfo ? (
            <NavDropdown
              className="text-white"
              title={userInfo.name}
              id="basic-nav-dropdown"
            >
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </Link>
              <Link to="/orderhistory" style={{ textDecoration: "none" }}>
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link
                to="#signout"
                onClick={signoutHandler}
                style={{
                  color: "black",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block", // To ensure the centering works within dropdown
                }}
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <NavDropdown
              className="text-white"
              id="basic-nav-dropdown"
              title=""
            >
              {/*<Link className="nav-link text-white ms-2" to="/signin">*/}
              {/*  <NavDropdown.Item>Sign in</NavDropdown.Item>*/}
              {/*</Link>*/}

              <Link
                to="/signin"
                onClick={signoutHandler}
                style={{
                  color: "black",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block", // To ensure the centering works within dropdown
                }}
              >
                Sign in
              </Link>

              <NavDropdown.Divider />
              {/*<Link className="nav-link text-white" to="/signup">*/}
              {/*  <NavDropdown.Item>Sign Up</NavDropdown.Item>*/}
              {/*</Link>*/}
              <Link
                to="/signup"
                style={{
                  color: "black",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block", // To ensure the centering works within dropdown
                }}
              >
                Sign up
              </Link>
            </NavDropdown>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
