import { useContext, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Title from "../components/shared/Title.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils.jsx";
import { toast } from "react-toastify";
import { Store } from "../store.jsx";
import { USER_SIGNIN } from "../actions.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = enteredValues;
    try {
      const { data } = await axios.post("/api/v1/users/signup", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      toast.error(getError(err));
      console.log(err.message);
    }
  };

  return (
    <Container className="small-container">
      <Title title="Sign-In" />
      <h1 className="my-3">Sign-Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
          />
        </Form.Group>
        <div className="mb-3">
          <Button
            type="submit"
            disabled={enteredValues.password !== enteredValues.confirmPassword}
          >
            Sign-up
          </Button>
          {enteredValues.password !== enteredValues.confirmPassword &&
            "Passwords do not match"}
        </div>
        <div className="mb-3">
          Already have account? <Link to="/signin">Sign in here</Link>
        </div>
        <div className="mb-3">
          Forgot password? <Link to="/forget-password">Reset password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
