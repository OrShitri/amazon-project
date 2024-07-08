import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "../shared/Rating.jsx";
import { useContext } from "react";
import { Store } from "../../store.jsx";
import { addToCartHandler } from "../../utils.jsx";


const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <Card className="product-card">
      <Link to={`/products/${product.token}`}>
        <Card.Img
          style={{ padding: "20px" }}
          variant="top"
          src={product.image}
          alt={product.title}
        />
      </Link>
     
      <Card.Body className="card-body">
        <Link to={`/products/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Rating
          rating={product.rating.rate}
          numReviews={product.rating.count}
        />
        <Card.Text>{product.price}$</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            className="btn-primary"
            onClick={() => addToCartHandler(product, cartItems, ctxDispatch)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};
export default Product;
