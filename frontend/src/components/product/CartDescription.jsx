import { Card, Col, Row, Badge, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const CartDescription = ({product, addToCart}) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>${product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                {product.countInStock > 0 ? (
                  <Badge>In Stock</Badge>
                ) : (
                  <Badge bg="success">Not in Stock</Badge>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          {product.countInStock > 0 && (
            <ListGroup.Item>
              <div className="d-grid">
                <Button onClick={() => addToCart()} variant="primary">
                  Add to Cart
                </Button>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

CartDescription.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};

export default CartDescription;
