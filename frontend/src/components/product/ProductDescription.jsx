import { ListGroup } from "react-bootstrap";
import Title from "../shared/Title.jsx";
import Rating from "../shared/Rating.jsx";
import PropTypes from "prop-types";

const ProductDescription = ({ title, rating, price, description }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <Title title={title} />
        <h1 style={{ wordWrap: "break-word" }}>{title}</h1>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating.rate} num={rating.count} />
      </ListGroup.Item>
      <ListGroup.Item>Price: ${price}</ListGroup.Item>
      <ListGroup.Item>
        Description: <p className="lead"> {description}</p>
      </ListGroup.Item>
    </ListGroup>
  );
};

ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default ProductDescription;
