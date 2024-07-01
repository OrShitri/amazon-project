import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from '../shared/Rating';
 
const Product = ({product}) => {
  return (
    <Card className='product-card'>
        <Link to={`/product/${product.token}`}>
            <Card.Img style={{padding: '20px'}} variant='top' src={product.image} alt={product.title}></Card.Img>
        </Link>

            <Card.Body className='card-body'>
                <Link to={`/product/${product.token}`}>
                    <Card.Title>{product.title}</Card.Title>
                </Link>

                <Rating rating={product.rating.rate} numReviews={product.rating.count}/>

                <Card.Text>
                    {product.price}$
                </Card.Text>

                {product.countInStock === 0 ? 
                    (<Button variant='light' disabled>Out Of Stock</Button>) : 
                    (<Button className='btn-primary'>Add To Cart</Button>)}

            </Card.Body>
       
    </Card>
  )
}

Product.propTypes = {
    product: PropTypes.object
}

export default Product