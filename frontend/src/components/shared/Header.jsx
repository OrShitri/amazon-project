import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchBox from "./SearchBox";
import NavDropdwon from "react-bootstrap/NavDropdown";
import { Store } from "../../store";
import { useContext } from "react";


const Header = () => {
    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo
    } = state;
    const navigate = useNavigate();
    return (
    <header>
        <NavBar bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <NavBar.Brand>
                        <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" width={80} alt="Amazon logo"/>
                    </NavBar.Brand>
                </LinkContainer>
                {" "}
                <SearchBox/>
                <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
                    <Link to="/cart" className="nav-link">
                        <i className="fa fa-shopping-cart text-white"></i>
                        {/* {badge} */}
                    </Link>         
                </nav>  
                    {userInfo ? (
                        <NavDropdwon className="text-white" title={userInfo.name} id="basic-nav-dropdown">
                            <LinkContainer to="/profile">
                                <NavDropdwon.Item>User Profile</NavDropdwon.Item>
                            </LinkContainer>
                            
                            <LinkContainer to="/orderhistory">
                                <NavDropdwon.Item>Order History</NavDropdwon.Item>
                            </LinkContainer>

                            <NavDropdwon.Divider />
                            {/* TODO: Signout OnClick functionality */}
                            <Link to="#signout" className="dropdown-item">Sign Out</Link>
                        </NavDropdwon>
                    ) : (
                        <Link className="nav-link text-white me-2" to="/signin">Sign In</Link>
                    )}
                    
                {/* TODO  - deal with users */}
            </Container>
        </NavBar>
    </header>
  )
}

export default Header