import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

const Checkout = ({ cartItems, checkoutHandler }) => {
  return (
    <Card>
        <Card.Body>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>
                        {/* Counts the items in cart */}
                        Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}{" "}Items): ${cartItems.reduce((a,c) => a+ c.price * c.quantity, 0).toFixed(2)}
                    </h3>
                </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item variant='flush'>
                <div className='d-grid'>
                    <Button type='button' variant='primary' disabled={cartItems.length === 0} onClick={() => checkoutHandler()}>Checkout</Button>
                </div>
            </ListGroup.Item>
        </Card.Body>
    </Card>
  )
}

Checkout.propTypes = {
    cartItems: PropTypes.array,
    checkoutHandler: PropTypes.func,
}

export default Checkout