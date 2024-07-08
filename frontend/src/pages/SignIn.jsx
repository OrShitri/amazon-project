import { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Title from "../components/shared/Title.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils.jsx";
import { toast } from "react-toastify";
import { Store } from "../store.jsx";
import { USER_SIGNIN } from "../actions.jsx";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      navigate("/");
    } catch (err) {
      toast.error(getError(err));
      console.log(err.message);
    }
  };

  return (
    <Container className="small-container">
      <Title title="Sign-In" />
      <h1 className="my-3">Sign-in</h1>
      <Form onSubmit={loginSubmitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign-in</Button>
        </div>
        <div className="mb-3">
          New Customer? <Link to="/signup">Create new account</Link>
        </div>
        <div className="mb-3">
          Forgot password? <Link to="/forget-password">Reset password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;
